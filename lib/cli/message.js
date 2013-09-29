
var colors = require("colors"),
    _      = require("underscore"),
    evento = require("evento");

function Message(title) {

    this.title = "[" + title + "]";

    evento.on("error",   _.bind(this.error, this));
    evento.on("info",    _.bind(this.info, this));
    evento.on("success", _.bind(this.success, this));
    evento.on("warn",    _.bind(this.warn, this));
}

Message.prototype = {

    consoleLog: function(message)
    {
        console.log(this.getTitle() + " " + message);
    },

    error: function(msg)
    {
        this.consoleLog("Error:".red + " " + msg.red);
    },

    getTitle: function()
    {
        return this.title.green;
    },

    info: function(msg)
    {
        this.consoleLog(msg + " ...");
    },

    success: function(msg)
    {
        this.consoleLog(msg);
    },

    warn: function(msg)
    {
        this.consoleLog("Warning:".yellow + " " + msg.yellow);
    }
};

module.exports = Message;