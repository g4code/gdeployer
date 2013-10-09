
var util       = require("util"),
    evento     = require("evento"),
    translate  = require("../../translate/literal"),
    Super      = require("./super");

function Before() {

};

util.inherits(Before, Super);

module.exports = Before;


Before.prototype.allTasksExecuted = function()
{
    evento.trigger("success", translate.all_before_tasks_executed);
    evento.trigger("beforeTasksExecuted");
};

Before.prototype.getDirPath = function()
{
    return this.config.destinationPath + "/" + this.config.latestVersionFileName;
};

Before.prototype.setTasks = function()
{
    this.tasks = this.config.tasks.before;

    return this;
};