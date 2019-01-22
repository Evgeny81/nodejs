const fs = require('fs');
const csv = require('csvtojson');
const {resolve} = require('path');
const {helpMessage} = require('./constants');

const args = [];
const thingsToDo = {};

process.argv.slice(2).forEach((val) => {
    const equalSignIndex = val.indexOf('=');
    if (equalSignIndex > -1) {
        args.push(val.slice(0, equalSignIndex));
        args.push(val.slice(equalSignIndex + 1));
    } else {
        args.push(val);
    }
});

args.forEach(handleArgs);

function handleArgs(arg, index) {
    switch (arg) {
        case '--help':
        case '-h':
            if (index === 0) {
                thingsToDo.help = true;
            }
            break;
        case '--action':
        case '-a':
            thingsToDo.action = getValue(index);
            break;
        case '--path':
        case '-p':
            thingsToDo.path = getValue(index);
            break;
        case '--file':
        case '-f':
            thingsToDo.file = getValue(index);
            break;
        default:
            break;
    }
}

function getValue(index) {
    const value = (index > -1) ? args[index + 1] : null;
    if (value === 'reverse' || value === 'transform') {
        if (args[index + 2]) {
            thingsToDo.string = args[index + 2];
        } else {
            throw new Error('You should specify the string');
        }
    }
    return value;
}

if (thingsToDo.help || !args.length) {
    if (!args.length) {
        process.stderr.write('WRONG INPUT: Please, provide the arguments \n\n')
    }
    help();
    process.exit();
}


switch (thingsToDo.action) {
    case 'reverse':
        reverse(thingsToDo.string);
        break;
    case 'transform':
        transform(thingsToDo.string);
        break;
    case 'outputFile':
        outputFile(thingsToDo.file);
        break;
    case 'convertFromFile':
        convertFromFile(thingsToDo.file);
        break;
    case 'convertToFile':
        convertToFile(thingsToDo.file);
        break;
    case 'cssBundler':
        cssBundler(thingsToDo.path);
        break;
}

function help() {
    helpMessage.forEach(message => {
        process.stdout.write(message);
    });
}

function reverse(str) {
    process.stdout.write(str);
}

function transform(str) {
    process.stdout.write(str.toUpperCase());
}

function outputFile(filePath) {
    const stream = fs.createReadStream(filePath);
    stream.pipe(process.stdout);
}

function convertFromFile(filePath) {
    transformCSVtoJSON(filePath).then((json)=>{
        process.stdout.write(JSON.stringify(json));
    });
}

function convertToFile(filePath) {
    const fileName = filePath.slice(0, filePath.indexOf('.'));
    transformCSVtoJSON(filePath).then((json)=>{
        const file = fs.createWriteStream(`${fileName}.json`);
        file.write(JSON.stringify(json));
        file.end();
    });
}

function cssBundler(path) {
    const pathToDir = resolve(path);
    fs.readdir(pathToDir, (err, res) => {
        if (err) {
            throw new Error(err);
        }

        const bundle = fs.createWriteStream(pathToDir + '/bundle.css');

        let readStream;
        res.forEach(fileName => {
            readStream = fs.createReadStream(pathToDir + `/${fileName}`);
            readStream.on('data', (data) => {
                bundle.write(data)
            })
        });

        readStream.on('close', () => {
            bundle.end();
        })
    })
}

function transformCSVtoJSON(filePath) {
    const path = resolve(filePath);
    return csv().fromFile(path);
}