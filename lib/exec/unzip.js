
var util   = require("util"),
    path   = require("path"),
    evento = require("evento"),
    Super  = require("./super");

function Unzip() {

};

module.exports = Unzip;

util.inherits(Unzip, Super);


Unzip.prototype.fileExtracted = false;

Unzip.prototype.fileName = null;

Unzip.prototype.options = {
    maxBuffer: 1024*1024*1024
};


Unzip.prototype.exec = function()
{
    return this.doExec("unzip " + this.fileName + " -d " + this.output);
};


Unzip.prototype.onExecCallback = function(error, stdout, stderr)
{
    if (error !== null) {
        evento.trigger("INFORMER_ERROR", "unzip: " + error)
    }

    this.fileExtracted = (error === null);

    this.emit("exec");
};