const fs = require('fs/promises');
const path = require('path');

async function copyDirectory() {
  const sourceDirectory = path.join(__dirname, 'files');
  const destinationDirectory = path.join(__dirname, 'files-copy');

  try {
    await fs.mkdir(destinationDirectory, { recursive: true });
    const content = await fs.readdir(sourceDirectory, { withFileTypes: true });
    await Promise.all(
      content.map(async (file) => {
        const source = path.join(sourceDirectory, file.name);
        const destination = path.join(destinationDirectory, file.name);
        if (file.isDirectory()) {
          await copyDir(source, destination);
        } else {
          await fs.copyFile(source, destination);
        }
      })
    );
  } catch (error) {
    console.error(error);
  }
}

copyDirectory();
