const fs = require('fs');

fs.writeFile('student.txt', 'Welcome to Node.js File System Module', (err) => {
    if (err) throw err;
    console.log('File created successfully');

    fs.readFile('student.txt', 'utf8', (err, data) => {
        if (err) throw err;
        console.log('File Content:', data);

        fs.appendFile('student.txt', '\nThis is Assignment 2.', (err) => {
            if (err) throw err;
            console.log('Data appended successfully');

            fs.readFile('student.txt', 'utf8', (err, data) => {
                if (err) throw err;
                console.log('Updated Content:', data);
            });
        });
    });
});