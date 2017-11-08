
var path       = require("path"),
    _          = require("underscore"),
    evento     = require("evento"),
    informer   = require("informer"),
    validator  = require('./gdeployer/validator'),
    filter     = require('./gdeployer/filter'),
    git        = require('./gdeployer/git'),
    config     = require("./gdeployer/config"),
    archive    = require("./gdeployer/archive"),
    unpack     = require("./gdeployer/unpack"),
    exportTo   = require("./gdeployer/export-to"),
    symlink    = require("./gdeployer/symlink"),
    BeforeTask = require("./gdeployer/task/before"),
    AfterTask  = require("./gdeployer/task/after")
    cleanup    = require("./gdeployer/cleanup");
var Logger          = require("./logger/logger")
var LoggerWriter    = require("./logger/logger-writer")

var timer = {
    start    : null,
    end      : null,
    execution: null
};

function Gdeployer(){

    timer.start = new Date().getTime();

    informer.title("gdeployer")
            .titleColor("cyan");

    this.logger = new Logger()

    evento.on("EVENT_VALID",   _.bind(this.filter,         this));
    evento.on("EVENT_FILTER",  _.bind(this.git,            this));
    evento.on("EVENT_GIT",     _.bind(this.config,         this));
    evento.on("EVENT_CONFIG",  _.bind(this.archive,        this));
    evento.on("EVENT_ARCHIVE", _.bind(this.unpack,         this));
    evento.on("EVENT_UNPACK",  _.bind(this.exportTo,       this));
    evento.on("EVENT_EXPORT",  _.bind(this.runBeforeTasks, this));
    evento.on("EVENT_BEFORE",  _.bind(this.runSymlinkTask, this));
    evento.on("EVENT_SYMLINK", _.bind(this.runAfterTasks,  this));
    evento.on("EVENT_AFTER",   _.bind(this.cleanup,        this));
    evento.on("EVENT_CLEANUP", _.bind(this.finish,         this));
};

module.exports = Gdeployer;

Gdeployer.prototype = {

    request: {},

    archive: function()
    {
        archive.request = this.request;
        archive.run();
    },
    
    cleanup: function()
    {
        cleanup.request = this.request;
        cleanup.run();
    },

    config: function()
    {
        config.request = this.request;
        config.read();
    },
    
    exportTo: function()
    {
        exportTo.request = this.request;
        exportTo.save();
    },

    filter: function()
    {
        filter.request = this.request;
        filter.filter();
    },

    finish: function()
    {
        timer.end      = new Date().getTime();
        timer.excution = (timer.end - timer.start)/1000;

        evento.trigger("INFORMER_INFO", "Executed in: "+timer.excution+"s");
        evento.trigger("INFORMER_INFO", "Deployed at version: "+this.request.version);
        evento.trigger("INFORMER_SUCCESS", "ALL DONE");

        this.logger.log(new LoggerWriter(this.request))
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
        task.setConfig(this.request)
            .run();
    },

    runBeforeTasks: function()
    {
        var task = new BeforeTask();
        task.setConfig(this.request)
            .run();
    },

    runSymlinkTask: function()
    {
        symlink.request = this.request;
        symlink.run();
    },

    unpack: function()
    {
        unpack.request = this.request;
        unpack.run();
    }
};