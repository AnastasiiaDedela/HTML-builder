const fs = require('fs/promises');
const path = require('path');

const copyDirectory = async (sourceDir, destDir) => {
  try {
    await fs.promises.mkdir(destDirectory, { recursive: true });

    const content = await fs.promises.readdir(sourceDirectory, { withFileTypes: true });

    for (const file in content){
      const sourcePath = path.join(sourceDir, file.name)
      const destinationPath = path.join(destDir, file.name)

      if (file.isFile()) {
          await fs.promises.copyFile(sourceDir, destinationPath)
      } else if (file.isDirectory()) {
          await copyDirectory(sourcePath, destinationPath)
      }
    }
  
  } catch (error) {
    console.error("Failed to copy folder: ", error);
  }
}

const sourceDirectory = path.join(__dirname, 'files');
const destinationDirectory = path.join(__dirname, 'files-copy');

copyDirectory(sourceDirectory, destinationDirectory);
