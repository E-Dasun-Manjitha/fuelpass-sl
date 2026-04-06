const fs = require('fs');
const filePath = 'd:\\Git Projects\\Fuel Project\\backend\\test_prices.log';
const stats = fs.statSync(filePath);
const size = stats.size;
const bufferSize = Math.min(size, 4000); // 4000 bytes should be enough for the tail
const buffer = Buffer.alloc(bufferSize);
const fd = fs.openSync(filePath, 'r');
fs.readSync(fd, buffer, 0, bufferSize, size - bufferSize);
fs.closeSync(fd);
console.log(buffer.toString('utf16le'));
