const fs = require('fs');
fs.readFile('test.txt', 'utf-8', (err, data) => {
    console.log(data);
});
console.log('This is a message');
for (let index = 0; index < 2000; index++) {
    console.log('This is a message', index);
    if (index === 1000) {
        // Introduce a delay to allow the event loop to process the callback
        setTimeout(() => {}, 0);
    }
}