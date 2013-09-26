
var colors = require("colors"),
    _      = require("underscore"),
    event  = require("../event");

function Message(title) {

    this.title = "[" + title + "]";

    event.on("error",   _.bind(this.error, this));
    event.on("info",    _.bind(this.info, this));
    event.on("success", _.bind(this.success, this));
    event.on("warn",    _.bind(this.warn, this));
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