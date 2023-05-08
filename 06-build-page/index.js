const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const assetsDir = path.join(__dirname, 'assets');
const distDir = path.join(__dirname, 'project-dist');
const componentsDir = path.join(__dirname, 'components');


const copy = async (sourceDir, destDir) => {

    try {
        await fs.promises.access(destDir)
    } catch {
        await fs.promises.mkdir(destDir, { recursive: true })
    }

    try {
      const stats = await fs.promises.stat(sourceDir)

      if (stats.isFile()) {
        await fs.promises.copyFile(sourceDir, destDir)
        return
      }

      const files = await fs.promises.readdir(sourceDir, { withFileTypes: true });

      for (const file of files){
        const sourcePath = path.join(sourceDir, file.name)
        const destinationPath = path.join(destDir, file.name)

        if (file.isFile()) {
            await fs.promises.copyFile(sourcePath, destinationPath)
        } else {
            await fs.promises.mkdir(destinationPath, { recursive: true });
        }

        await copy(sourcePath, destinationPath)
      }
    
    } catch (error) {
      console.error("Failed to copy folder: ", error);
    }
}

const htmlBundle = async () => {
  try {
    const htmlFiles = await fs.promises.readdir(componentsDir, { withFileTypes: true });
    let templateData = await fs.promises.readFile(
      path.join(__dirname, 'template.html'),
      'utf-8'
    );
    const htmlWriteStream = fs.createWriteStream(
      path.join(distDir, 'index.html')
    );

    for (let html of htmlFiles) {
      let htmlCurrentPath = path.parse(path.join(componentsDir, html.name));
      if (html.isFile() && htmlCurrentPath.base.endsWith(".html")) {
        const htmlFragment = await fs.promises.readFile(
          path.join(componentsDir, html.name),
          'utf-8'
        );

        templateData = templateData.replace(
          new RegExp(`{{${htmlCurrentPath.name}}}`, 'g'),
          htmlFragment
        );
      }
    }

    htmlWriteStream.write(templateData);
  } catch (err) {
    console.error('HTML Bundle Error: ', err.message);
  }
}

const cssBundle = async() => {
  try {
    const writeStream = fs.createWriteStream(
      path.join(__dirname, 'project-dist', 'style.css')
    );

    let files = await fs.promises.readdir(stylesDir, { withFileTypes: true });

    for (let file of files.reverse()) {
      if (file.isFile() && file.name.endsWith(".css")) {
        fs.createReadStream(path.join(stylesDir, file.name)).pipe(
          writeStream,
          { end: false }
        );
      }
    }
  } catch (err) {
    console.error('CSS Bundle Error: ', err.message);
  }
}

const makeBundle = async () => {
    console.log("Starting bundle process...")
    try {
        await copy(assetsDir, path.join(distDir, 'assets'))
        await htmlBundle();
        await cssBundle();
        console.log('Bundle was successful');
    } catch {
        console.log("Bundle error :(")
    }
}

makeBundle()