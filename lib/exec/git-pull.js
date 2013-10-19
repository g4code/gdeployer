
var util   = require("util"),

    Super  = require("./super");

function GitPull() {

};

module.exports = GitPull;

util.inherits(GitPull, Super);


GitPull.prototype.message = null;

GitPull.prototype.notGitRepo = false;


GitPull.prototype.exec = function()
{
    return this.doExec("git pull");
};

GitPull.prototype.onExecCallback = function(error, stdout, stderr)
{
    this.notGitRepo = stderr.length > 0;
    this.message = this.notGitRepo ? stderr : stdout;

    this.emit("exec");
};