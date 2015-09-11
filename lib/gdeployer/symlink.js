
var fs     = require("fs"),
    _      = require("underscore"),
    evento = require("evento");

function Symlink() {

};

Symlink.prototype = {

    request: null,


    link: function()
    {
        evento.trigger("success", "Symlink deleted");
        evento.trigger("loading", "Creating symlink");

        fs.symlink(this.request.version, this.request.deployPath, 'dir', _.bind(this.onLink, this));
    },

    onLink: function(err)
    {
        err
            ? evento.trigger("INFORMER_ERROR", "Cannot create a symlink")
            : this.symlinkCreated();
    },

    run: function()
    {
        evento.trigger("loading", "Deleting symlink");

        fs.unlink(this.request.deployPath, _.bind(this.link, this));
    },

    symlinkCreated: function()
    {
        evento.trigger("success", "Symlink created");
        evento.trigger("symlink");
    }
};

module.exports = new Symlink();