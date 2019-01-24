const fs = require('fs');
const csv = require('csvtojson');
const EventEmitter = require('events');
const {resolve} = require('path');
const {
    helpMessage,
    possibleFlags,
    errors,
    shortNameArgumentPattern,
    fullNameArgumentPattern
} = require('./constants');

const errorEmitter = new EventEmitter();

errorEmitter.on('error', (error) => {
    help();
    if (error) process.stderr.write(error);
    process.exit(1);
});

const executionMap = {
    action: {
        flag: '-a',
        execution: {
            reverse,
            transform,
            outputFile,
            convertFromFile,
            convertToFile,
            cssBundler
        },
        toExecute: null
    },
    help: {
        flag: '-h'
    },
    file: {
        flag: '-f'
    },
    path: {
        flag: '-p'
    }
};

function getArguments(userInput) {
    const args = [];
    userInput.slice(2).forEach((val) => {
        const equalSignIndex = val.indexOf('=');
        if (equalSignIndex > -1) {
            args.push(val.slice(0, equalSignIndex));
            args.push(val.slice(equalSignIndex + 1));
        } else {
            args.push(val);
        }
    });

    return args.map(item => { // convert all user input flags to '-f'-like string instead of '--flag'
        // for correct flags
        const flagIsNotCorrect = (
            item.match(fullNameArgumentPattern)
            || item.match(shortNameArgumentPattern))
            && !possibleFlags.includes(item
            );
        if (flagIsNotCorrect) {
            errorEmitter.emit('error', errors.incorrectFlag);
        }
        if (item.match(fullNameArgumentPattern)) {
            return `-${item[2]}`;
        }
        return item;
    });
}

const args = getArguments(process.argv);

if (args[0] === executionMap.help.flag || !args.length) {
    if (!args.length) {
        errorEmitter.emit('error', errors.noArguments);
    } else {
        errorEmitter.emit('error', null);
    }
}

if (!args.includes(executionMap.action.flag)) {
    errorEmitter.emit('error', errors.noAction);
}

function getIndex(flag) {
    return args.indexOf(flag);
}

function getParameter(index) {
    return args[index + 1];
}

const actionFlagIndex = getIndex(executionMap.action.flag);
const actionToExecute = getParameter(actionFlagIndex);

if (Object.keys(executionMap.action.execution).includes(actionToExecute)) {
    switch (actionToExecute) {
        case 'reverse':
        case 'transform':
            const strToHandle = args[actionFlagIndex + 2];
            if (strToHandle.match(shortNameArgumentPattern)) {
                errorEmitter.emit('error', errors.stringIsNotProvided);
            }
            executionMap.action.execution[actionToExecute](strToHandle);
            break;
        case 'outputFile':
        case 'convertFromFile':
        case 'convertToFile':
            const fileFlagIndex = getIndex(executionMap.file.flag);
            if (fileFlagIndex === -1) {
                errorEmitter.emit('error', errors.noFileFlag);
            }
            const fileToHandle = getParameter(fileFlagIndex);

            if (!~fileToHandle.indexOf('.csv')) {
                errorEmitter.emit('error', errors.incorrectFile);
            }
            executionMap.action.execution[actionToExecute](fileToHandle);
            break;
        case 'cssBundler':
            const pathFlagIndex = getIndex(executionMap.path.flag);
            const pathToHandle = getParameter(pathFlagIndex);
            if (pathFlagIndex === -1 || !pathToHandle) {
                errorEmitter.emit('error', errors.noPathFlag);
            }
            executionMap.action.execution[actionToExecute](pathToHandle);
            break;
    }
} else {
    errorEmitter.emit('error', errors.wrongActionParameter);
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
    const stream = fs.createReadStream(resolve(filePath));
    stream.pipe(process.stdout);
}

function convertFromFile(filePath) {
    transformCSVtoJSON(filePath).then((json) => {
        process.stdout.write(JSON.stringify(json));
    });
}

function convertToFile(filePath) {
    const fileName = filePath.slice(0, filePath.indexOf('.'));
    transformCSVtoJSON(filePath).then((json) => {
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
                bundle.write(data);
            });
        });

        readStream.on('close', () => {
            bundle.end();
        });
    });
}

function transformCSVtoJSON(filePath) {
    const path = resolve(filePath);
    return csv().fromFile(path);
}
