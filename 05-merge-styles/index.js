const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const outputPath = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(stylesPath, (error, files) => {
  if (error) {
    throw error;
  } else {
    const styleFiles = files.filter(file => {
        const extName = path.extname(file);
        return extName === '.css';
    });
    
    const cssContents = [];
    
    styleFiles.forEach((file, idx) => {
        const filePath = path.join(stylesPath, file);
        fs.readFile(filePath, 'utf-8', (error, content) => {
            if (error) {
                throw error;
            }
            cssContents[idx] = content;
    
            if (cssContents.length === styleFiles.length) {
                const output = cssContents.join('\n');
                fs.writeFile(outputPath, output, error => {
                    if (error) {
                        throw error;
                    }
                });
            }
        });
    });
  }
});
