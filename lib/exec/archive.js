
var util   = require("util"),
    Super  = require("./super");

function Archive() {

};

module.exports = Archive;

util.inherits(Archive, Super);


Archive.prototype.format = "zip";

Archive.prototype.output = null;

Archive.prototype.fileCreated = false;


Archive.prototype.exec = function()
{
    return this.doExec("git archive --format=" + this.format + " --output " + this.getOutput() + " master");
};

Archive.prototype.getOutput = function()
{
    return this.output + "." + this.format;
};

Archive.prototype.onExecCallback = function(error, stdout, stderr)
{
    this.fileCreated = error === null;

    this.emit("exec", this.fileCreated);
};

Archive.prototype.setOutput = function(output)
{
    this.output = output;

    return this;
};