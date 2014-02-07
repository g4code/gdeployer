
var util   = require("util"),
    Super  = require("./super");

function Status() {

};

module.exports = Status;

util.inherits(Status, Super);

Status.prototype.isGitRepo = false;

Status.prototype.exec = function()
{
    return this.doExec("git status");
};

Status.prototype.onExecCallback = function(error, stdout, stderr)
{
    this.isGitRepo = stdout.length > 0 && stderr.length === 0;

    this.emit("exec", this.isGitRepo);
};