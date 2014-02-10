
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
    evento.trigger("success", "All before live tasks executed");
//    evento.trigger("beforeTasksExecuted");
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