
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

Pull.prototype.repoPath = null;

/**
 * GitPull instance
 */
Pull.prototype.gitPull = null;


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
                .exec()
                .on("exec", _.bind(this.onPull, this));
};

Pull.prototype.setRepoPath= function(repoPath)
{
    this.repoPath = repoPath;

    return this;
};