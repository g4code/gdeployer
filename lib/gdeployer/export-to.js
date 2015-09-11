
var fs     = require("fs"),
    _      = require("underscore"),
    evento = require("evento"),
    moment = require("moment");

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
            time: moment().format("X")
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
        
        evento.trigger("export");
    },
    
    save: function()
    {
        this.isExportRequested()
            ? this.exportVersion()
            : evento.trigger("export");
    }
};

module.exports = new ExportTo();