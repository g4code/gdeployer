
var path       = require("path"),
    _          = require("underscore"),
    evento     = require("evento"),
    informer   = require("informer"),
    translate  = require("./translate/literal"),

    validator = require('./gdeployer/validator'),
    filter    = require('./gdeployer/filter'),

    Config     = require("./gdeployer/config"),
    Pull       = require("./gdeployer/pull"),
    Archive    = require("./gdeployer/archive"),
    Unpack     = require("./gdeployer/unpack"),
    Symlink    = require("./gdeployer/symlink"),
    BeforeTask = require("./gdeployer/task/before"),
    AfterTask  = require("./gdeployer/task/after");

var timer = {
    start    : null,
    end      : null,
    execution: null
};

function Gdeployer(){

    timer.start = new Date().getTime();

    informer.title("gdeployer")
            .titleColor("cyan");

    evento.on("error",   _.bind(informer.error,   informer));
    evento.on("success", _.bind(informer.success, informer));
    evento.on("info",    _.bind(informer.info,    informer));
    evento.on("warning", _.bind(informer.warning, informer));
    evento.on("loading", _.bind(informer.loading, informer));

    evento.on("valid",     _.bind(this.filter,  this));
//    evento.on("filter",    _.bind(this.git,     this));
    evento.on("pulledNewCode",       _.bind(this.runConfigTask, this));
    evento.on("configDetected",      _.bind(this.runArchiveTask, this));
    evento.on("archiveCreated",      _.bind(this.runUnpackTask, this));
    evento.on("archiveExtracted",    _.bind(this.runBeforeTasks, this));
    evento.on("beforeTasksExecuted", _.bind(this.runSymlinkTask, this));
    evento.on("symlinkCreated",      _.bind(this.runAfterTasks, this));
    evento.on("afterTasksExecuted",  _.bind(this.allDone, this));
};

module.exports = Gdeployer;

Gdeployer.prototype = {

    request: {
        args                 : null,
        configPath           : null,
        remoteRepositoryName : null,
        branchName           : null
    },

//    config: null,
//
//    repoPath: null,
//
//    repositoryName: null,


    filter: function()
    {
        filter.request = this.request;
        filter.filter();
    },

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

    run: function()
    {
        validator.request = this.request;
        validator.validate();

//        this.runPullTask();
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

    runConfigTask: function()
    {
        this.config = new Config();
        this.config.setRepoPath(this.getRepoPath())
                   .setConfigRelativePath(this.configRelativePath)
                   .setVersionType(this.latest)
                   .readConf();
    },

    runArchiveTask: function()
    {
        var archive = new Archive();
        archive.setConfig(this.config.getConfig())
               .run();
    },

    runPullTask: function()
    {
        var pull = new Pull();
        pull.setRepoPath(this.getRepoPath())
            .setBranchName(this.branchName)
            .setRepositoryName(this.repositoryName)
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
    }
};