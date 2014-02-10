
var fs     = require("fs"),
    _      = require("underscore"),
    evento = require("evento");

function Unpack() {

};

Unpack.prototype = {

    request: null,

    versionPathExists: function()
    {
        return fs.existsSync(this.request.versionPath);
    },

    run: function()
    {
        evento.trigger("loading", "Unpacking archive");

        this.versionPathExists()
            ? evento.trigger("error", "Version path exists: "+this.request.versionPath)
            : this.unpack();
console.log(this.request);
    },

    unpack: function()
    {

    }
};

module.exports = new Unpack();