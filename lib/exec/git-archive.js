
var util   = require("util"),
    Super  = require("./super");

function GitArchive() {

};

module.exports = GitArchive;

util.inherits(GitArchive, Super);


GitArchive.prototype.format = "zip";

GitArchive.prototype.tree = "master";

GitArchive.prototype.fileCreated = false;


GitArchive.prototype.exec = function()
{
    return this.doExec(this.getCommand());
};

GitArchive.prototype.getCommand = function()
{
    return [
            "git archive",
            " --format=",
            this.format,
            " --output ",
            this.getOutput(),
            " ",
            this.tree
    ].join("");
};

GitArchive.prototype.getOutput = function()
{
    return this.output + "." + this.format;
};

GitArchive.prototype.onExecCallback = function(error, stdout, stderr)
{
    this.fileCreated = (error === null);

    this.emit("exec", this.fileCreated);
};