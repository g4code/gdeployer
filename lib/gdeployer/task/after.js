
var util       = require("util"),
    evento     = require("evento"),
    Super      = require("./super");

function After() {

};

util.inherits(After, Super);

module.exports = After;


After.prototype.allTasksExecuted = function()
{
    evento.trigger("INFORMER_SUCCESS", "All after live tasks executed");
    evento.trigger("after");
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