
var fs         = require("fs"),
    path       = require('path'),
    fse        = require("fs-extra"),
    _          = require("underscore"),
    evento     = require("evento"),
    Versions   = require("./cleanup/versions");

function Cleanup() {

};

Cleanup.prototype = {

    request: null,

    versions: null,

    removeOldVersions: function()
    {
        var markedForDelete = new Versions(this.request).getMarkedForDelete();
        if (markedForDelete.length > 0) {
            _.each(markedForDelete, _.bind(this.removeOneVersion, this));
        }
    },

    removeOneVersion: function(file)
    {
        try {
            fse.removeSync(path.join(this.request.destinationPath, file));
            evento.trigger("INFORMER_SUCCESS", "Version deleted: "+file);
        } catch(err) {
            evento.trigger("INFORMER_WARNING", "Cannot delete version: "+file);
        }
    },

    run: function()
    {
        evento.trigger("INFORMER_LOADING", "Cleanup old versions");

        this.unlinkArchive();
        this.removeOldVersions();

        evento.trigger("EVENT_CLEANUP");
    },

    unlinkArchive: function()
    {
        try {
            fs.unlinkSync(this.request.archivePath);
            evento.trigger("INFORMER_SUCCESS", "Archive file deleted: "+this.request.archivePath);
        } catch (err) {
            evento.trigger("INFORMER_WARNING", "Cannot delete file: "+this.request.archivePath)
        }
    }
};

module.exports = new Cleanup();