
var exec   = require('child_process').exec,
    events = require('events'),
    util   = require("util"),
    _      = require('underscore');

function Super() {

};

util.inherits(Super, events.EventEmitter);

module.exports = Super;


Super.prototype.dirPath = null;

Super.prototype.output = null;

Super.prototype.options = {};


Super.prototype.doExec = function(command) {

    exec("cd " + this.dirPath + " && " + command, this.getOptions(), _.bind(this.onExecCallback, this));

    return this;
};

Super.prototype.getOptions = function()
{
    return this.options;
};

Super.prototype.getOutput = function()
{
    return this.output;
};

Super.prototype.onExecCallback = function(error, stdout, stderr) {

    console.log(error, stdout, stderr);
};

Super.prototype.setDirPath = function(dirPath) {

    this.dirPath = dirPath;

    return this;
};

Super.prototype.setOutput = function(output)
{
    this.output = output;

    return this;
};