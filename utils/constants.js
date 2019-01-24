module.exports.helpMessage = [
    'Usage: node ./streams.js --<flag> <additional> || -<f>=<additional>',
    'where <flag> is one of: action*, file, help, path \n',
    'where action <flag> should be provided \n',
    'where <additional> for action flag is one of: reverse, transform, outputFile, convertFromFile, convertToFile, cssBundler\n',
    'where <additional> for file flag is a file to process \n',
    'where <additional> for path flag is a path to directory \n'
];
module.exports.possibleFlags = ['--help', '-h', '--action', '-a', '--file', '-f', '--path', '-p'];
module.exports.fullNameArgumentPattern = new RegExp(/--[a-z]/);
module.exports.shortNameArgumentPattern = new RegExp(/-[a-z]{1}/);

module.exports.errors = {
    incorrectFlag: '\nWRONG INPUT: You should provide correct flag \n',
    noArguments: '\nWRONG INPUT: Please, provide the arguments \n\n',
    noAction: '\nWRONG INPUT: Please, provide the "--action" flag with certain action \n\n',
    wrongActionParameter: '\nWRONG INPUT: Please, provide action with a correct parameter \n\n',
    stringIsNotProvided: '\nWRONG INPUT: Please, provide a correct string to handle \n\n',
    noFileFlag: '\nWRONG INPUT: Path to file should be provided \n\n',
    incorrectFile: '\nWRONG INPUT: Correct file should be provided \n\n',
    noPathFlag: '\nWRONG INPUT: Path to directory should be provided \n\n',

};
