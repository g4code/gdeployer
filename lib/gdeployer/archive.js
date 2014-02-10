
var path       = require("path"),
    _          = require("underscore"),
    evento     = require("evento"),
    GitArchive = require("../exec/git-archive");

function Archive() {

};

Archive.prototype = {

    request: null,
    
    
    errorCreatingFile: function()
    {
        evento.trigger("error", "Error creating archive file");
    },
    
    fileCreated: function()
    {
        evento.trigger("success", "Archive file created");
        evento.trigger("archive");
    },
    
    onArchive: function(fileCreated)
    {
        fileCreated ? this.fileCreated() : $this.errorCreatingFile();
    },

    run: function()
    {
        evento.trigger("loading", "Archiving git repository");
        
        var gitArchive = new GitArchive();
        gitArchive.setDirPath(this.request.repository)
                  .setOutput(this.request.archivePath)
                  .exec()
                  .on("exec", _.bind(this.onArchive, this));
    }
};

module.exports = new Archive();