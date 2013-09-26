
var colors = require("colors"),
    _      = require("underscore"),
    event  = require("../event");

function Message() {

    event.on("errorMsg", _.bind(this.error, this));
    event.on("infoMsg", _.bind(this.info, this));
    event.on("successMsg", _.bind(this.success, this));
    event.on("warnMsg", _.bind(this.warn, this));
}

Message.prototype = {

    title: "[gdeployer]",

    error: function(msg)
    {
        console.log(this.getTitle() + " " + "*".red + " " + msg);
    },

    getTitle: function()
    {
        return this.title.green;
    },

    info: function(msg)
    {
        console.log(this.getTitle() + " " + "*".blue + " " + msg);
    },

    success: function(msg)
    {
        console.log(this.getTitle() + " "+ "*".green + " " + msg);
    },

    warn: function(msg)
    {
        console.log(this.getTitle() + " " + "*".yellow + " " + msg);
    }
};

module.exports = Message;