
var util   = require("util"),
    path   = require("path"),
    Super  = require("./super");

function Unzip() {

};

module.exports = Unzip;

util.inherits(Unzip, Super);


Unzip.prototype.fileExtracted = false;

Unzip.prototype.fileName = null;


Unzip.prototype.exec = function()
{
    return this.doExec("unzip " + this.fileName + " -d " + this.output);
};


Unzip.prototype.onExecCallback = function(error, stdout, stderr)
{
    this.fileExtracted = (error === null);

    this.emit("exec");
};

Unzip.prototype.setFileName = function(fileName)
{
    this.fileName = fileName;

    return this;
};