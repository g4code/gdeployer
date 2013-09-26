
var util   = require("util"),
    Super  = require("./super");

function Unzip() {

};

module.exports = Unzip;

util.inherits(Unzip, Super);


Unzip.prototype.exec = function()
{
    return this.doExec("");
};


Unzip.prototype.onExecCallback = function(error, stdout, stderr)
{

};