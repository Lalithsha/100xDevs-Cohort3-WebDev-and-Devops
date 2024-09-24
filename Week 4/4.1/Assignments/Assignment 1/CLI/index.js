
const fs = require('fs');
const path = require('path');
const { Command } = require('commander');
const program = new Command();

program
    .name('string-util')
    .description('CLI to some JavaScript string utilities')

console.log(__dirname);
program.command('count')
    .description('Count number of words in your file')
    .argument('<file>', 'file to count')
    .action((file) => {

        const filePath = path.join(file, 'a.txt');
        console.log("File Path is " + filePath);


        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const lines = data.split('\n').length
                console.log(`There are ${lines} lines in ${file}`);

                console.log(" You have " + data.length + " words in this file");
            }
        });
    });

program.parse();
























