
var path       = require("path"),
    event      = require("./event"),
    CliMessage = require("./cli/message");

function App(){

    new CliMessage();
};

module.exports = App;

App.prototype = {

    args: [],

    repoPath: null,

    checkForConfig: function()
    {

    },

    getRepoPath: function()
    {
        if(this.repoPath === null) {
            this.repoPath = path.resolve(this.args.shift() || "./");
        }

        return this.repoPath;
    },

    init: function()
    {
        event.trigger("errorMsg", "error");
        event.trigger("infoMsg", "info");
        event.trigger("successMsg", "success");
        event.trigger("warnMsg", "warn");
    },

    setArgs: function(args)
    {
        this.args = args;

        return this;
    }

};