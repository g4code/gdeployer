
var util   = require("util"),
    Super  = require("./super");

function GitPull() {

};

module.exports = GitPull;

util.inherits(GitPull, Super);


GitPull.prototype.exec = function()
{
    return this.doExec("git pull");
};

GitPull.prototype.onExecCallback = function(error, stdout, stderr)
{
    console.log(stdout);

    this.emit("exec");
};