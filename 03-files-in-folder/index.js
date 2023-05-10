const fs = require('fs/promises');
const path = require('path');

async function readContent() {
  try {
    const content = await fs.readdir('./03-files-in-folder/secret-folder', { withFileTypes: true });
    for (let file of content) {
      if (file.isFile()) {
        const stat = await fs.stat(`./03-files-in-folder/secret-folder/${file.name}`);
        const size = stat.size / 1024;
        const extName = path.extname(file.name).slice(1);
        const fileName = path.basename(file.name, `.${extName}`);
        console.log(`${fileName} - ${extName} - ${(size.toFixed(3) + 'kb')}`);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

readContent();





