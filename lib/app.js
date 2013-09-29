
var path       = require("path"),
    _          = require("underscore"),
    evento     = require("evento"),
    Config     = require("./gdeployer/config"),
    Git        = require("./gdeployer/git"),
    Unpack     = require("./gdeployer/unpack"),
    Symlink    = require("./gdeployer/symlink"),
    CliMessage = require("./cli/message");

function App(){

    new CliMessage("gdeployer");

    evento.on("configDetected",   _.bind(this.runGitTask, this));
    evento.on("archiveCreated",   _.bind(this.runUnpackTask, this));
    evento.on("archiveExtracted", _.bind(this.runSymlinkTask, this));
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
        git.setConfig(this.config.getConfig())
           .run();
    },

    runSymlinkTask: function()
    {
        var symlink = new Symlink();
        symlink.setConfig(this.config.getConfig())
               .run();
    },

    runUnpackTask: function()
    {
        var unpack = new Unpack();
        unpack.setConfig(this.config.getConfig())
               .run();
    },

    setArgs: function(args)
    {
        this.args = args;

        return this;
    }
};