
var util  = require("util"),
    _     = require("underscore"),
    Super = require("./super");

function Pull() {

};

module.exports = Pull;

util.inherits(Pull, Super);

Pull.prototype.branchName           = null;

Pull.prototype.remoteRepositoryName = null;


Pull.prototype.exec = function()
{
    return this.doExec(this.getCommand());
};

Pull.prototype.getCommand = function()
{
    return [
        "git",
        "pull",
        this.getRemoteRepositoryName(),
        this.getBranchName()
    ].join(" ");
};

Pull.prototype.getBranchName = function()
{
    return _.isUndefined(this.branchName) || _.isNull(this.branchName)
        ? ""
        : this.branchName;
};

Pull.prototype.getRemoteRepositoryName = function()
{
    return _.isUndefined(this.remoteRepositoryName) || _.isNull(this.remoteRepositoryName)
        ? ""
        : this.remoteRepositoryName;
};