
var util       = require("util"),
    path       = require("path"),
    _          = require("underscore"),
    SuperObj   = require("./super-obj"),
    event      = require("../event"),
    translate  = require("../translate/literal");
    GitArchive = require("../exec/archive");

function Git() {

};

util.inherits(Git, SuperObj);

module.exports = Git;


Git.prototype.getArchiveOutput = function()
{
    return path.normalize(this.config.destinationPath + "/" + this.config.repoName);
};

Git.prototype.onArchive = function(archiveFileCreated)
{
    archiveFileCreated
        ? event.trigger("success", translate.archive_created) && event.trigger("archiveCreated")
        : event.trigger("error", translate.cannot_create_archive);
};

Git.prototype.run = function()
{
    event.trigger("info", translate.creating_archive)

    var gitArchive = new GitArchive();
    gitArchive.setDirPath(this.config.repoPath)
              .setOutput(this.getArchiveOutput())
              .exec()
              .on("exec", _.bind(this.onArchive, this));
};