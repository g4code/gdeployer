
var fs     = require("fs"),
    _      = require("underscore"),
    evento = require("evento");
    ;

function ExportTo() {

};

ExportTo.prototype = {

    request: null,
    
    
    exportVersion: function()
    {
        fs.writeFile(this.request.exportPath, this.getVersionData(), _.bind(this.onWriteFile, this));
    },
    
    getVersionData: function()
    {
        return JSON.stringify({
            version: this.request.version,
            time: this.request.timestamp
        });
    },
    
    isExportRequested: function()
    {
        return !_.isNull(this.request.exportPath);
    },

    onWriteFile: function(err)
    {
        err
            ? evento.trigger("INFORMER_WARNING", "Cannot export version to file: "+this.request.exportPath)
            : evento.trigger("INFORMER_SUCCESS", "Version saved to: "+this.request.exportPath);
        
        evento.trigger("EVENT_EXPORT");
    },
    
    save: function()
    {
        this.isExportRequested()
            ? this.exportVersion()
            : evento.trigger("EVENT_EXPORT");
    }
};

module.exports = new ExportTo();