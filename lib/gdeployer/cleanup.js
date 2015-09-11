
var path       = require("path"),
    _          = require("underscore"),
    evento     = require("evento");

function Cleanup() {

};

Cleanup.prototype = {

    request: null,


    run: function()
    {
        evento.trigger("INFORMER_LOADING", "Cleanup old versions");

        evento.trigger("EVENT_CLEANUP");
    }
};

module.exports = new Cleanup();