
var path       = require("path"),
    _          = require("underscore"),
    event      = require("./event"),
    Config     = require("./gdeployer/config"),
    Git        = require("./gdeployer/git"),
    CliMessage = require("./cli/message");

function App(){

    new CliMessage("gdeployer");

    event.on("onConfigDetected", _.bind(this.runGitTask, this));
};

module.exports = App;

App.prototype = {

    args: [],

    config: null,

    repoPath: null,

    initConfig: function()
    {
        this.config = new Config();
        this.config.setRepoPath(this.getRepoPath())
                   .readConf();

        return this;
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
        this.initConfig();
    },

    runGitTask: function()
    {

    },

    setArgs: function(args)
    {
        this.args = args;

        return this;
    }

};