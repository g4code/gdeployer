
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

    evento.on("valid",   _.bind(this.filter,         this));
    evento.on("filter",  _.bind(this.git,            this));
    evento.on("git",     _.bind(this.config,         this));
    evento.on("config",  _.bind(this.archive,        this));
    evento.on("archive", _.bind(this.unpack,         this));
    evento.on("unpack",  _.bind(this.exportTo,       this));
    evento.on("export",  _.bind(this.runBeforeTasks, this));
    evento.on("before",  _.bind(this.runSymlinkTask, this));
    evento.on("symlink", _.bind(this.runAfterTasks,  this));
    evento.on("after",   _.bind(this.finish,         this));
};

module.exports = Gdeployer;

Gdeployer.prototype = {

    request: {},

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

        evento.trigger("info", "Executed in: "+timer.excution+"s");
        evento.trigger("info", "Deployed at version: "+this.request.version);
        evento.trigger("success", "ALL DONE");
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