
var util   = require("util"),
    Super  = require("./super");

function LatestTag() {

};

module.exports = LatestTag;

util.inherits(LatestTag, Super);


LatestTag.prototype.exec = function()
{
    return this.doExec("git describe --abbrev=0 --tags");
};

LatestTag.prototype.onExecCallback = function(error, stdout, stderr)
{
    this.emit("exec", stdout.replace("\n", ""));
}