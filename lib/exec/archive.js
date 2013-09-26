
var util   = require("util"),
    Super  = require("./super");

function Archive() {

};

module.exports = Archive;

util.inherits(Archive, Super);


Archive.prototype.destinationPath = null;

Archive.prototype.fileCreated = false;


Archive.prototype.exec = function()
{
    return this.doExec("git archive --format=zip --output " + this.getOutputFile() + " master");
};

Archive.prototype.getOutputFile = function()
{
    return this.destinationPath + "/gdeployer.zip";
}

Archive.prototype.onExecCallback = function(error, stdout, stderr)
{
    this.fileCreated = error === null;

    this.emit("exec", this.fileCreated);
};

Archive.prototype.setDestinationPath = function(destinationPath)
{
    this.destinationPath = destinationPath;

    return this;
}