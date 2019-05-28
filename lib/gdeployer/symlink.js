
var fs     = require("fs")
var _      = require("underscore")
var evento = require("evento")
var exec   = require('child_process').exec

function Symlink() {

    this.request = null
};

Symlink.prototype = {

    link: function()
    {
        evento.trigger("INFORMER_SUCCESS", "Symlink deleted");
        evento.trigger("INFORMER_LOADING", "Creating symlink");

        fs.symlink(this.request.version, this.request.deployPath, 'dir', _.bind(this.onLink, this));
    },

    onChown: function(error, stdout, stderr)
    {
        if (!_.isEmpty(error)) {
            evento.trigger("INFORMER_ERROR", error.message)
        } else {
            if (!_.isEmpty(stderr)) {
                evento.trigger("INFORMER_WARNING", stderr)
            }

            if (!_.isEmpty(stdout)) {
                evento.trigger("INFORMER_SUCCESS", stdout)
            }
        }

        evento.trigger("INFORMER_SUCCESS", `Symlink ownership changed to ${this.request.changeFileOwner}`);

        this.symlinkCreated()
    },

    onLink: function(err)
    {
        if (err) {
            evento.trigger("INFORMER_ERROR", "Cannot create a symlink")
            return
        }

        if (this.request.changeFileOwner !== null) {
            evento.trigger("INFORMER_LOADING", "Changing symlink ownership");
            console.log(`chown ${this.request.changeFileOwner} ${this.request.deployPath}`)
            exec(`chown ${this.request.changeFileOwner} ${this.request.deployPath}`, this.onChown.bind(this))
            return
        }

        this.symlinkCreated();
    },

    run: function()
    {
        evento.trigger("INFORMER_LOADING", "Deleting symlink");

        fs.unlink(this.request.deployPath, _.bind(this.link, this));
    },

    symlinkCreated: function()
    {
        evento.trigger("INFORMER_SUCCESS", "Symlink created");
        evento.trigger("EVENT_SYMLINK");
    }
};

module.exports = new Symlink();