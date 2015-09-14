
var path   = require("path"),
    _      = require("underscore"),
    evento = require("evento"),
    moment = require("moment");

function Config() {

};

Config.prototype = {

    archiveFormat: "zip",

    request: null,

    config: null,

    versionsToKeep: 3,

    addToRequest: function()
    {
        this.request.destinationPath = this.getDestinationPath();
        this.request.tasks           = this.getTasks();
        this.request.version         = this.getVersion();
        this.request.versionPath     = this.getVersionPath();
        this.request.repoName        = path.basename(this.request.repository);
        this.request.archiveFormat   = this.archiveFormat;
        this.request.archivePath     = this.getArchivePath();
        this.request.deployPath      = this.getDeployPath();
        this.request.tree            = this.getTree();
        this.request.exportPath      = this.getExportPath();
        this.request.versionsToKeep  = this.getVersionsToKeep();

        evento.trigger("INFORMER_SUCCESS", "Configuration loaded");
        evento.trigger("EVENT_CONFIG");
    },

    getArchivePath: function()
    {
        return path.normalize([
           this.request.destinationPath,
           "/",
           this.request.repoName,
           ".",
           this.archiveFormat
       ].join(""));
    },

    getDeployPath: function()
    {
        return path.normalize([
           this.request.destinationPath,
           "/",
           this.request.repoName
       ].join(""));
    },

    getDestinationPath: function()
    {
        return path.resolve(this.config.destinationPath);
    },

    getExportPath: function()
    {
        return _.isUndefined(this.request.exportTo)
            ? null
            : path.resolve([
                this.request.versionPath,
                this.request.exportTo,
                'version.json'
            ].join("/"));
    },

    getTasks: function()
    {
        this.config.tasks = _.isObject(this.config.tasks) ? this.config.tasks : {};
        return {
            before: _.isArray(this.config.tasks.before) ? this.config.tasks.before : [],
            after : _.isArray(this.config.tasks.after) ? this.config.tasks.after : []
        };
    },

    getTree: function()
    {
        return _.isUndefined(this.request.tag)
            ? this.getTreeForLatest()
            : this.request.tag;
    },

    getTreeForLatest: function()
    {
        return this.request.from == 'branch'
            ? this.request.branchName
            : this.request.latestTag;
    },

    getVersion: function()
    {
        return _.isUndefined(this.request.tag)
            ? this.getVersionForLatest()
            : this.request.tag;
    },

    getVersionForBranch: function()
    {
        return [
            this.request.latestTag,
            this.request.branchName.replace(/\//g, "."),
            moment().format('YYYYMMDDHHmmss')
        ].join(".");
    },

    getVersionForLatest: function()
    {
        return this.request.from == 'branch'
            ? this.getVersionForBranch()
            : this.request.latestTag;
    },

    getVersionPath: function()
    {
        return path.normalize([
           this.request.destinationPath,
           this.request.version
       ].join("/"));
    },

    read: function()
    {
        try {
            
            evento.trigger("INFORMER_LOADING", "Reading config file");
            this.config = require(this.request.configPath);
            this.addToRequest();
            
        } catch (e) {
            evento.trigger("INFORMER_ERROR", "Cannot read config file: "+this.request.configPath);
        }
    },

    getVersionsToKeep: function()
    {
        return _.isUndefined(this.config.versionsToKeep) || this.config.versionsToKeep < 1 ?
            this.versionsToKeep :
            this.config.versionsToKeep;
    }
};

module.exports = new Config();