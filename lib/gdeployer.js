
var path       = require("path"),
    _          = require("underscore"),
    evento     = require("evento"),
    informer   = require("informer"),
    translate  = require("./translate/literal"),

    validator = require('./gdeployer/validator'),
    filter    = require('./gdeployer/filter'),
    git       = require('./gdeployer/git'),
    config    = require("./gdeployer/config"),
    archive   = require("./gdeployer/archive"),

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
    evento.on("filter",    _.bind(this.git,     this));
    evento.on("git",       _.bind(this.config,  this));
    evento.on("config",    _.bind(this.archive, this));
    
    evento.on("archiveCreated",      _.bind(this.runUnpackTask, this));
    evento.on("archiveExtracted",    _.bind(this.runBeforeTasks, this));
    evento.on("beforeTasksExecuted", _.bind(this.runSymlinkTask, this));
    evento.on("symlinkCreated",      _.bind(this.runAfterTasks, this));
    evento.on("afterTasksExecuted",  _.bind(this.finish, this));
};

module.exports = Gdeployer;

Gdeployer.prototype = {

    request: {
        args                 : null,
        configPath           : null,
        remoteRepositoryName : null,
        branchName           : null,
        from                 : null,
        tag                  : null
    },
    
    
    archive: function()
    {
        archive.request = this.request;
        archive.run();
    },
    
    config: function()
    {
        config.request = this.request;
        config.read();
    },

    filter: function()
    {
        filter.request = this.request;
        filter.filter();
    },

    finish: function()
    {
        evento.trigger("success", translate.all_done);
    },

    git: function()
    {
        git.request = this.request;
        git.start();
    },

    run: function()
    {
        validator.request = this.request;
        validator.validate();
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