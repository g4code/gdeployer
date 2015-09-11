
var path       = require("path"),
    _          = require("underscore"),
    evento     = require("evento"),
    GitArchive = require("../exec/git-archive");

function Archive() {

};

Archive.prototype = {

    request: null,


    fileCreated: function()
    {
        evento.trigger("INFORMER_SUCCESS", "Archive file created");
        evento.trigger("archive");
    },

    onArchive: function(fileCreated)
    {
        fileCreated 
            ? this.fileCreated() 
            : evento.trigger("INFORMER_ERROR", "Error creating archive file");
    },

    run: function()
    {
        evento.trigger("INFORMER_LOADING", "Archiving git repository");

        var gitArchive = new GitArchive();
        gitArchive.tree   = this.request.tree;
        gitArchive.format = this.request.archiveFormat;
        gitArchive.setDirPath(this.request.repository)
                  .setOutput(this.request.archivePath)
                  .exec()
                  .on("exec", _.bind(this.onArchive, this));
    }
};

module.exports = new Archive();