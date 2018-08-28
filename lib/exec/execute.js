
var util    = require("util"),
    _       = require("underscore"),
    evento  = require("evento"),
    Super   = require("./super");
var Timer   = require("../gdeployer/timer")

function Execute() {
    this.timer = new Timer()
};

module.exports = Execute;

util.inherits(Execute, Super);


Execute.prototype.exec = function(command)
{
    this.timer.start()
    return this.doExec(command);
};

Execute.prototype.onExecCallback = function(error, stdout, stderr)
{

    this.timer.end()

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

    evento.trigger("INFORMER_INFO", "Execution time: " + this.timer.getExcutionTimeFormatted())

    this.timer.reset()

    this.emit("exec");
};