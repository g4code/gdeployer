
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

    if (!_.isEmpty(error)) {
        evento.trigger("INFORMER_ERROR", error.message);
    } else {
        if (!_.isEmpty(stderr)) {
            evento.trigger("INFORMER_WARNING", stderr);
        }

        if (!_.isEmpty(stdout)) {
            evento.trigger("INFORMER_SUCCESS", stdout);
        }
    }

    this.emit("exec");
};