
var util  = require("util"),
    _     = require("underscore"),
    Super = require("./super");

function GitPull() {

};

module.exports = GitPull;

util.inherits(GitPull, Super);

GitPull.prototype.branchName     = null;
GitPull.prototype.message        = null;
GitPull.prototype.notGitRepo     = false;
GitPull.prototype.repositoryName = null;


GitPull.prototype.exec = function()
{
    return this.doExec(this.getCommand());
};

GitPull.prototype.getCommand = function()
{
    return [
        "git",
        "pull",
        (this.hasRepositoryName() ? this.repositoryName : ""),
        (this.hasBranchName() ? this.branchName : "")
    ].join(" ");
};

GitPull.prototype.hasBranchName = function()
{
    return !(_.isUndefined(this.branchName) || _.isNull(this.branchName));
};

GitPull.prototype.hasRepositoryName = function()
{
    return !(_.isUndefined(this.repositoryName) || _.isNull(this.repositoryName));
};

GitPull.prototype.onExecCallback = function(error, stdout, stderr)
{
    this.notGitRepo = stderr.length > 0 && /Not a git repository/.test(stderr);
    this.message = this.notGitRepo ? stderr : stdout;

    this.emit("exec");
};

GitPull.prototype.setBranchName = function(branchName)
{
    this.branchName = branchName;
    return this;
};

GitPull.prototype.setRepositoryName = function(repositoryName)
{
    this.repositoryName = repositoryName;
    return this;
};