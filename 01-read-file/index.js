const fs = require('fs');

let stream = fs.createReadStream('./01-read-file/text.txt');

stream.on('data', data => console.log(data.toString('utf-8')));
stream.on('error', error => console.log(error));