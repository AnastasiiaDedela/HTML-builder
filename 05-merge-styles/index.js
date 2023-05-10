const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const outputPath = path.join(__dirname, 'project-dist', 'bundle.css');

const cssBundle = async(stylesPath, outputPath) => {
    try {
      const writeStream = fs.createWriteStream(outputPath);
      let files = await fs.promises.readdir(stylesPath, { withFileTypes: true });
  
      for (let file of files.reverse()) {
        if (file.isFile() && file.name.endsWith(".css")) {
          fs.createReadStream(path.join(stylesPath, file.name)).pipe(
            writeStream,
            { end: false }
          );
        }
      }
    } catch (err) {
      console.error('CSS Bundle Error: ', err.message);
    }
}

cssBundle(stylesPath, outputPath);
