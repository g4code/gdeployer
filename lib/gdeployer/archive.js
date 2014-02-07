
var path       = require("path"),
    _          = require("underscore"),
    evento     = require("evento"),
    GitArchive = require("../exec/git-archive");

function Archive() {

};

Archive.prototype = {

    request: null,

    run: function()
    {
        evento.trigger("loading", "Archiving git repository");

//        this.gitArchive = new GitArchive();
//        this.gitArchive.setDirPath(this.config.repoPath)
//                       .setOutput(this.getArchiveOutput())
//                       .exec()
//                       .on("exec", _.bind(this.onArchive, this));
    }
};

module.exports = new Archive();