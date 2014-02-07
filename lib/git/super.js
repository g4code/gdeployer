
var exec   = require('child_process').exec,
    events = require('events'),
    util   = require("util"),
    _      = require('underscore');

function Super() {

};

util.inherits(Super, events.EventEmitter);

module.exports = Super;

Super.prototype.repoPath = null;

Super.prototype.doExec = function(command) {

    exec("cd " + this.repoPath + " && " + command, _.bind(this.onExecCallback, this));

    return this;
};

Super.prototype.onExecCallback = function(error, stdout, stderr)
{
    console.log(stdout);
    console.log(stderr);
    this.emit("exec");
};

Super.prototype.setRepoPath = function(repoPath) {

    this.repoPath = repoPath;

    return this;
};