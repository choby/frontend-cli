const path = require('path');
const fse = require('fs-extra');
const { INJECT_FILES } = require('./constants');

function getRootPath() {
    return path.resolve(__dirname, './..');
}

function getPackageVersion() {
    const version = require(path.join(getRootPath(), 'package.json')).version;
    return version;
}

function logPackageVersion() {
    const msg = `zero-cli version: ${getPackageVersion()}`;
    console.log();
    console.log(msg);
    console.log();
}
exports.logPackageVersion = logPackageVersion;
exports.getPackageVersion = getPackageVersion;

function getDirFileName(dir) {
    try {
        const files = fse.readdirSync(dir);
        const filesToCopy = [];
        files.forEach((file) => {
            if (file.indexOf(INJECT_FILES) > -1) return;
            filesToCopy.push(file);
        });
        return filesToCopy;
    } catch (e) {
        return [];
    }
}

exports.getDirFileName = getDirFileName;


const bindEvent = (childProcess) => {

    childProcess.stdout.on('data', (data) => {
        console.log(chalk.default('✅ ' + data.toString()))
    })

    childProcess.stderr.on('data', (data) => {
        console.log(chalk.default('❌ ' + data.toString()))
    })

    childProcess.on('exit', (code) => {
        console.log('child process exited with code ' + code.toString())
    })
}

exports.bindEvent = bindEvent;