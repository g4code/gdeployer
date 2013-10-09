
var path       = require("path"),
    _          = require("underscore"),
    evento     = require("evento"),
    translate  = require("./translate/literal"),
    Config     = require("./gdeployer/config"),
    Git        = require("./gdeployer/git"),
    Unpack     = require("./gdeployer/unpack"),
    Symlink    = require("./gdeployer/symlink"),
    BeforeTask = require("./gdeployer/task/before"),
    AfterTask  = require("./gdeployer/task/after"),
    CliMessage = require("./cli/message");

function App(){

    new CliMessage("gdeployer");

    evento.on("configDetected",      _.bind(this.runGitTask, this));
    evento.on("archiveCreated",      _.bind(this.runUnpackTask, this));
    evento.on("archiveExtracted",    _.bind(this.runBeforeTasks, this));
    evento.on("beforeTasksExecuted", _.bind(this.runSymlinkTask, this));
    evento.on("symlinkCreated",      _.bind(this.runAfterTasks, this));
    evento.on("afterTasksExecuted",  _.bind(this.allDone, this));
};

module.exports = App;

App.prototype = {

    args: [],

    config: null,

    repoPath: null,


    allDone: function()
    {
        evento.trigger("success", translate.all_done);
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
        this.config = new Config();
        this.config.setRepoPath(this.getRepoPath())
                   .readConf();
    },

    runAfterTasks: function()
    {
        var task = new AfterTask();
        task.setConfig(this.config.getConfig())
            .run();
    },

    runBeforeTasks: function()
    {
        var task = new BeforeTask();
        task.setConfig(this.config.getConfig())
            .run();
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