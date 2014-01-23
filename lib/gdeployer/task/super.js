
var util       = require("util"),
    _          = require("underscore"),
    SuperObj   = require("../super-obj"),
    evento     = require("evento"),
    translate  = require("../../translate/literal"),
    Execute    = require("../../exec/execute");

function Task() {

};

util.inherits(Task, SuperObj);

module.exports = Task;

Task.prototype.counter = -1;

Task.prototype.tasks = [];

Task.prototype.total = 0;


Task.prototype.allTasksExecuted = function()
{
    evento.trigger("success", translate.all_tasks_executed);
    evento.trigger("tasksExecuted");
};

Task.prototype.detect = function()
{
    this.total = this.tasks.length;

    evento.trigger("success", translate.tasks_detected + ": " + this.total);

    return this;
};

Task.prototype.execute = function()
{
    this.incrementCounter();

    this.hasTask() ? this.executeOneTask() : this.allTasksExecuted();
};

Task.prototype.executeOneTask = function()
{
    var command = this.tasks[this.counter];

    evento.trigger("info", translate.executing_task + ": " + command);

    var execute = new Execute();
    execute.setDirPath(this.getDirPath())
           .exec(command)
           .on("exec", _.bind(this.execute, this));
};

Task.prototype.getDirPath = function()
{
    console.log("inplement in child obj");
};

Task.prototype.hasTask = function()
{
    return !_.isUndefined(this.tasks[this.counter]);
};

Task.prototype.incrementCounter = function()
{
    ++this.counter;

    return this;
};

Task.prototype.run = function()
{
    this.setTasks()
        .detect()
        .execute();
};

Task.prototype.setTasks = function()
{
    console.log("inplement in child obj");

    return this;
};