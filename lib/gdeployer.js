
var evento          = require("evento")
var informer        = require("informer")
var validator       = require('./gdeployer/validator')
var filter          = require('./gdeployer/filter')
var git             = require('./gdeployer/git')
var config          = require("./gdeployer/config")
var archive         = require("./gdeployer/archive")
var unpack          = require("./gdeployer/unpack")
var exportTo        = require("./gdeployer/export-to")
var symlink         = require("./gdeployer/symlink")
var BeforeTask      = require("./gdeployer/task/before")
var AfterTask       = require("./gdeployer/task/after")
var cleanup         = require("./gdeployer/cleanup")
var Logger          = require("./logger/logger")
var LoggerWriter    = require("./logger/logger-writer")
var Timer           = require("./gdeployer/timer")

function Gdeployer(){

    this.timer = new Timer()
    this.timer.start()

    informer.title("gdeployer")
            .titleColor("cyan");

    this.logger = new Logger()

    evento.on("EVENT_VALID",   this.filter.bind(this))
    evento.on("EVENT_FILTER",  this.git.bind(this))
    evento.on("EVENT_GIT",     this.config.bind(this))
    evento.on("EVENT_CONFIG",  this.archive.bind(this))
    evento.on("EVENT_ARCHIVE", this.unpack.bind(this))
    evento.on("EVENT_UNPACK",  this.exportTo.bind(this))
    evento.on("EVENT_EXPORT",  this.runBeforeTasks.bind(this))
    evento.on("EVENT_BEFORE",  this.runSymlinkTask.bind(this))
    evento.on("EVENT_SYMLINK", this.runAfterTasks.bind(this))
    evento.on("EVENT_AFTER",   this.cleanup.bind(this))
    evento.on("EVENT_CLEANUP", this.finish.bind(this))
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
        this.timer.end()
        this.request.executionTime = this.timer.getExcutionTimeFormatted();
        this.timer.reset()

        evento.trigger("INFORMER_INFO", "Total execution time: " + this.request.executionTime);
        evento.trigger("INFORMER_INFO", "Deployed at version: " + this.request.version);
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