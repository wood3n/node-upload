const shell = require("shelljs");
shell.exec(`fsutil file createnew bigfile.txt ${1024 * 1024 * 1024}`);
