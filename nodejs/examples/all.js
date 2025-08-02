'use strict';

// --- PROTOTYPE ------------------------------------------------


// function Profile() {

// }

// Profile.prototype.getData = function(name, age, place) {
//     this.name = name;
//     this.age = age;
//     this.place = place;
// };

// Profile.prototype.showData = function() {
//     console.log('Hello there');
// };


// --- ARGV ----------------------------------------------------


// --- PATH ----------------------------------------------------


// --- OS ------------------------------------------------------

// var os = require('os'),
//     pf = os.platform();

// if (pf === 'darwin') {
//     console.log('Using an OSX');
// } else if (pf === 'win32') {
//     console.log('Buy a Mac! :)');
// }

// var path = require('path'),
//     os   = require('os'),
//     tmp  = (os.tmpdir || os.tmpDir)(),
//     uuid = require('uuid');


// var randomFile = function(ext) {
//     return path.join(tmp, uuid.v4() + (ext || ''));
// };

// console.log(randomFile('.jpg'));

// --- GLOBALS -------------------------------------------------

// __filename and __dirname
// console.log(__filename);
// console.log(__dirname);

// Timer
// setTimeout(function() {
//     console.log('nodejs running!');
// }, 1000);

// setInterval(function(){
//     console.log('i am running...');
// }, 200);


// --- CONSOLE ------------------------------------------------

// var num = 10;

// console.log('count: %d', num);
// console.log('count: ' + num);

// console.time('100-elements');
// for (var i = 0; i < 100; i++) {
//     ;
// }
// console.timeEnd('100-elements');

// console.info('info para o console');
// console.error('erro para o console');
// console.warn('aviso para o console');

// --- PROCESS ------------------------------------------------


// var shell = require('child_process'),
//     dirs  = ['app', 'public'].join(','),
//     files = ['style.css', 'script.js'].join(',');

// shell.exec('mkdir {' + dirs + '} && cd app && touch {' + files + '}');

// process.on('exit', function(code) {
//     console.log('Exit code: %s', code);
// });

// process.on('uncaughtException', function(err) {
//     console.log('Caught exception: ' + err);
// });

// process.stdin.setEncoding('utf8');

// var content = function(chunk) {
//     var chunk = process.stdin.read();
//     if (chunk !== null) {
//         process.stdout.write('data: ' + chunk);
//     }
// }

// process.stdin.on('readable', content);

// process.stdin.on('end', function() {
//     process.stdout.write('end');
// });

// process.argv.forEach(function(val, index, array) {
//     console.log(index + ': ' + val);
// });

// console.log(process.execPath);
// console.log(process.execArgv);

// console.log('Starting directory: ' + process.cwd());
// try {
//     process.chdir('/tmp');
//     console.log('New directory: ' + process.cwd());
// }
// catch (err) {
//     console.log('chdir: ' + err);
// }

// console.log('Current directory: ' + process.cwd());

// function tild(str) {

//     var dir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
//     return str.replace(dir, '~');

// }

// console.log(tild('/Users/vitorbritto/projects/biosys/lib/system.js'));

// function untild(str) {

//     var dir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
//     return str.replace(/^~\//, dir + '/');

// }

// console.log(untild('~/projects/biosys/lib/system.js'));

// console.log('--------------------------------------------\n');
// console.log(' SYSTEM INFORMATION:\n');
// console.log(' System    : %s ', process.env._system_name);
// console.log(' Platform  : %s ', process.platform);
// console.log(' Language  : %s ', process.env.LANG);
// console.log(' Username  : %s ', process.env.USER);
// console.log(' Shell     : %s ', process.env.SHELL);
// console.log(' Home PATH : %s ', process.env.HOME);
// console.log(' Editor    : %s ', process.env.EDITOR);
// console.log(' Node      : %s \n', process.version);
// console.log('--------------------------------------------');

// --- UTIL ------------------------------------------------

// var util = require('util'),
//     dataJSON = require('./data');


// console.log(util.format('JSON Object is: %j', dataJSON));

// util.log('Timestamped message.');
// util.debug('message on stderr');
// util.error('message on stderr');
// util.puts('message on stderr');

// isArray
// console.log(util.isArray([]));
// console.log(util.isArray(new Array()));

// isRegExp
// console.log(util.isRegExp(/some regexp/));
// console.log(util.isRegExp(new RegExp('another regexp')));


// --- HTTP ------------------------------------------------

// var http = require('http');

// function handler(req, res) {

//     var body = 'Body here!',
//         len  = body.length;

//     res.end('End!');

// }

// var server = http.createServer(handler);

// server.listen(8080);


// --- STREAMS -------------------------------------------------

// var fs = require('fs');

// var Bullet = function() {

//     var _this = this;

//     this.input = function(str) {
//         fs.createReadStream(str);
//         return _this;
//     };

//     this.run  = function(task) {
//         process.exec(task);
//         return _this;
//     };

//     this.output  = function(str) {
//         fs.createWriteStream(str);
//         return _this;
//     };
// };

