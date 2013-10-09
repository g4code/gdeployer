
var util       = require("util"),
    evento     = require("evento"),
    translate  = require("../../translate/literal"),
    Super      = require("./super");

function After() {

};

util.inherits(After, Super);

module.exports = After;


After.prototype.allTasksExecuted = function()
{
    evento.trigger("success", translate.all_after_tasks_executed);
    evento.trigger("afterTasksExecuted");
};

After.prototype.getDirPath = function()
{
    return this.config.destinationPath + "/" + this.config.repoName;
};

After.prototype.setTasks = function()
{
    this.tasks = this.config.tasks.after;

    return this;
};