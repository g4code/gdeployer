
var fs     = require("fs")
var evento = require("evento")
var _      = require("underscore")
var exec   = require('child_process').exec

function Chown() {

    this.maxBufferSize  = 1024 * 1024
    this.request        = null
};

Chown.prototype = {

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
        evento.trigger("EVENT_CHOWN")
    },

    run: function()
    {
        if (this.request.changeFileOwner === null) {
            evento.trigger("EVENT_CHOWN")
            return
        }
        evento.trigger("INFORMER_LOADING", `Changing file ownership to ${this.request.changeFileOwner}`)

        exec(`chown -R ${this.request.changeFileOwner} ${this.request.versionPath}`, {maxBuffer: this.maxBufferSize}, this.onChown.bind(this))
    }
};

module.exports = new Chown()