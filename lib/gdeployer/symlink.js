
var fs         = require("fs"),
    _          = require("underscore"),
    evento      = require("evento");

function Symlink() {

};

Symlink.prototype = {

    request: null,


    link: function()
    {
        evento.trigger("success", "Symlink deleted");
        evento.trigger("info", "Creating symlink");

        fs.symlink(this.request.versionPath, this.request.deployPath, 'dir', _.bind(this.onLink, this));
    },

    onLink: function(err)
    {
        err
            ? evento.trigger("error", translate.cannot_create_symlink)
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