
var util       = require("util"),
    path       = require("path"),
    _          = require("underscore"),
    SuperObj   = require("./super-obj"),
    evento      = require("evento"),
    translate  = require("../translate/literal"),
    GitArchive = require("../exec/git-archive");

function Git() {

};

util.inherits(Git, SuperObj);

module.exports = Git;


Git.prototype.gitArchive = null;


Git.prototype.getArchiveOutput = function()
{
    return path.normalize(this.config.destinationPath + "/" + this.config.repoName);
};

Git.prototype.onArchive = function()
{
    if (!this.gitArchive.fileCreated) {

        evento.trigger("error", translate.cannot_create_archive);
        return;
    }

    this.config.archiveFile = this.gitArchive.getOutput();

    evento.trigger("success", translate.archive_created);
    evento.trigger("archiveCreated");
};

Git.prototype.run = function()
{
    evento.trigger("info", translate.creating_archive);

    this.gitArchive = new GitArchive();
    this.gitArchive.setDirPath(this.config.repoPath)
                   .setOutput(this.getArchiveOutput())
                   .exec()
                   .on("exec", _.bind(this.onArchive, this));
};