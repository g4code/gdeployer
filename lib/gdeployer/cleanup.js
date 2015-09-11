
var fs         = require("fs"),
    _          = require("underscore"),
    evento     = require("evento");

function Cleanup() {

};

Cleanup.prototype = {

    request: null,
    
    
    

    run: function()
    {
        evento.trigger("INFORMER_LOADING", "Cleanup old versions");

        this.unlinkArchive();

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