const fs = require('fs');
const path = require('path');
const readline = require('readline');

const newFile = 'text.txt';
const pathToFile = path.join(__dirname, newFile);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const writeStream = fs.createWriteStream(pathToFile, { flags: 'a' });

writeStream.write('Greetings, share your thoughts with me\n');
console.log('Greetings, share your thoughts with me\n');

rl.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    console.log('Bye, have a nice day :)');
    writeStream.end(() => {
      process.exit();
    });
} else {
    writeStream.write(`${input}\n`);
  }
});

// For Linux, Mac
process.on('SIGINT', () => {
    console.log('Bye, have a nice day :)');
    writeStream.end();
    process.exit();
});

// Windows
process.on('exit', () => {
    console.log('Bye, have a nice day :)');
    writeStream.end();
    process.exit();
});

writeStream.on('finish', () => {
  console.log('Write stream closed');
});
