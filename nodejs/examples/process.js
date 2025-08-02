'use strict';

// print process.argv
process.argv.forEach(function(val, index) {
    console.log('%s : %s', index, val);
});

// print the executable path of script
console.log(process.execPath);

// print options
console.log(process.execArgv);

// print executable command
console.log(process.argv);

// print current directory
console.log('Current directory: %s', process.cwd());

// print NodeJS version
console.log('Version: %s', process.version);
