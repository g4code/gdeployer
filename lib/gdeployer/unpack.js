
var fs     = require("fs"),
    _      = require("underscore"),
    evento = require("evento"),
    Unzip  = require("../exec/unzip");

function Unpack() {

};

Unpack.prototype = {

    request: null,

    unzip: null,


    onUnzip: function()
    {
        this.unzip.fileExtracted
            ? this.versionExtracted()
            : evento.trigger("INFORMER_ERROR", "Cannot extract archive to version path: "+this.request.versionPath);
    },

    run: function()
    {
        this.versionPathExists()
            ? evento.trigger("INFORMER_ERROR", "Version path exists: "+this.request.versionPath)
            : this.unpack();
    },

    unpack: function()
    {
        evento.trigger("INFORMER_LOADING", "Unpacking archive");

        this.unzip = new Unzip();
        this.unzip.fileName = this.request.archivePath;
        this.unzip.output   = this.request.versionPath;
        this.unzip.setDirPath(this.request.repository); //unnecessary
        this.unzip.exec()
                  .on("exec", _.bind(this.onUnzip, this));
    },

    versionExtracted: function()
    {
        evento.trigger("INFORMER_SUCCESS", "Archive extracted to: "+this.request.versionPath);
        evento.trigger("EVENT_UNPACK");
    },

    versionPathExists: function()
    {
        return fs.existsSync(this.request.versionPath);
    }
};

module.exports = new Unpack();