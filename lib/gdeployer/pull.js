
var util       = require("util"),
    path       = require("path"),
    _          = require("underscore"),
    SuperObj   = require("./super-obj"),
    evento     = require("evento"),
    translate  = require("../translate/literal"),
    GitPull    = require("../exec/git-pull");

function Pull() {

};

util.inherits(Pull, SuperObj);

module.exports = Pull;

Pull.prototype.defaultBranchName     = "master";
Pull.prototype.defaultRepositoryName = "origin";
Pull.prototype.branchName            = null;
Pull.prototype.repoPath              = null;
Pull.prototype.repositoryName        = null;
Pull.prototype.gitPull               = null; // GitPull instance


Pull.prototype.codePulled = function()
{
    evento.trigger("success", this.gitPull.message);
    evento.trigger("success", translate.pulled_new_code);
    evento.trigger("pulledNewCode");
};

Pull.prototype.notGitRepo = function()
{
    evento.trigger("error", this.gitPull.message);
};

Pull.prototype.onPull = function()
{
    this.gitPull.notGitRepo
        ? this.notGitRepo()
        : this.codePulled();
};

Pull.prototype.run = function()
{
    evento.trigger("info", translate.pulling_new_code);

    this.gitPull = new GitPull();
    this.gitPull.setDirPath(this.repoPath)
                .setRepositoryName(this.repositoryName)
                .setBranchName(this.branchName);

    evento.trigger("info", this.gitPull.getCommand());

    this.gitPull.exec()
                .on("exec", _.bind(this.onPull, this));
};

Pull.prototype.setBranchName = function(branchName)
{
    this.branchName = _.isUndefined(branchName)
        ? this.defaultBranchName
        : branchName;
    return this;
};

Pull.prototype.setRepoPath= function(repoPath)
{
    this.repoPath = repoPath;
    return this;
};

Pull.prototype.setRepositoryName = function(repositoryName)
{
    this.repositoryName = _.isUndefined(repositoryName)
        ? this.defaultRepositoryName
        : repositoryName;
    return this;
};