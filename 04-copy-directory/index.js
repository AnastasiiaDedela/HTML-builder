const fs = require('fs');
const path = require('path');

const copyDir = async (sourceDir, destDir) => {

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

      await copyDir(sourcePath, destinationPath)
    }
  
  } catch (error) {
    console.error("Failed to copy folder: ", error);
  }
}

const sourceDirectory = path.join(__dirname, 'files');
const destinationDirectory = path.join(__dirname, 'files-copy');

copyDir(sourceDirectory, destinationDirectory);
