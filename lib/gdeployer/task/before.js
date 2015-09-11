
var util       = require("util"),
    evento     = require("evento"),
    Super      = require("./super");

function Before() {

};

util.inherits(Before, Super);

module.exports = Before;


Before.prototype.allTasksExecuted = function()
{
    evento.trigger("INFORMER_SUCCESS", "All before live tasks executed");
    evento.trigger("EVENT_BEFORE");
};

Before.prototype.getDirPath = function()
{
    return this.config.versionPath;
};

Before.prototype.setTasks = function()
{
    this.tasks = this.config.tasks.before;

    return this;
};