
var _          = require("underscore"),
    event      = require("../event"),
    translate  = require("../translate/literal");
    GitArchive = require("../exec/archive");

function Git() {

};

module.exports = Git;

Git.prototype = {

    config: null,

    onArchive: function(archiveFileCreated)
    {
        archiveFileCreated
            ? event.trigger("success", translate.archive_created) && event.trigger("archiveCreated")
            : event.trigger("error", translate.cannot_create_archive);
    },

    run: function()
    {
        event.trigger("info", translate.creating_archive)

        var gitArchive = new GitArchive();
        gitArchive.setDirPath(this.config.repoPath)
                  .setDestinationPath(this.config.destinationPath)
                  .exec()
                  .on("exec", _.bind(this.onArchive, this));
    },

    setConfig: function(config)
    {
        this.config = config;

        return this;
    }
};