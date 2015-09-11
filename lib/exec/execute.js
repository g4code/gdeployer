
var util   = require("util"),
    _      = require("underscore"),
    evento = require("evento"),
    Super  = require("./super");

function Execute() {

};

module.exports = Execute;

util.inherits(Execute, Super);


Execute.prototype.exec = function(command)
{
    return this.doExec(command);
};

Execute.prototype.onExecCallback = function(error, stdout, stderr)
{
    if (!_.isEmpty(stderr)) {
        evento.trigger("INFORMER_ERROR", stderr);
    }

    if (!_.isEmpty(stdout)) {
        evento.trigger("success", stdout);
    }

    this.emit("exec");
};