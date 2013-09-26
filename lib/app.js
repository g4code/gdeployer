
var path       = require("path"),
    _          = require("underscore"),
    event      = require("./event"),
    Config     = require("./gdeployer/config"),
    Git        = require("./gdeployer/git"),
    CliMessage = require("./cli/message");

function App(){

    new CliMessage("gdeployer");

    event.on("configDetected", _.bind(this.runGitTask, this));
    event.on("archiveCreated", _.bind(this.runSymlinkTask, this));
};

module.exports = App;

App.prototype = {

    args: [],

    config: null,

    repoPath: null,

    getRepoPath: function()
    {
        if(this.repoPath === null) {
            this.repoPath = path.resolve(this.args.shift() || "./");
        }

        return this.repoPath;
    },

    init: function()
    {
        this.config = new Config();
        this.config.setRepoPath(this.getRepoPath())
                   .readConf();
    },

    runGitTask: function()
    {
        var git = new Git();
        git.setConfig(this.config.conf)
           .run();
    },

    runSymlinkTask: function()
    {
    },

    setArgs: function(args)
    {
        this.args = args;

        return this;
    }
};