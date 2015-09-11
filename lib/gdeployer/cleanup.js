
var path       = require("path"),
    _          = require("underscore"),
    evento     = require("evento");

function Cleanup() {

};

Cleanup.prototype = {

    request: null,


    run: function()
    {
        evento.trigger("loading", "Cleanup old versions");

        evento.trigger("cleanup");
    }
};

module.exports = new Cleanup();