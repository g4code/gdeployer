
var path   = require("path"),
    _      = require("underscore"),
    evento = require("evento"),
    moment = require("moment");

function Config() {

};

Config.prototype = {

    request: null,

    config: null,
    
    addToRequest: function()
    {
        this.request.destinationPath = this.getDestinationPath();
        this.request.tasks           = this.getTasks();
        this.request.version         = this.getVersion();
        
        evento.trigger("config");
    },
    
    getDestinationPath: function()
    {
        return path.resolve(this.config.destinationPath);
    },
    
    getTasks: function()
    {
        this.config.tasks = _.isObject(this.config.tasks) ? this.config.tasks : {};
        return {
            before: _.isArray(this.config.tasks.before) ? this.config.tasks.before : [],
            after : _.isArray(this.config.tasks.after) ? this.config.tasks.after : []
        };
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
            this.request.branchName,
            moment().format('YYYYMMDDHHmmss')
        ].join(".");
    },
    
    getVersionForLatest: function()
    {
        return this.request.from == 'branch'
            ? this.getVersionForBranch()
            : this.request.latestTag
    },

    read: function()
    {
        evento.trigger("loading", "Reading config file");
        try {
            this.config = require(this.request.configPath);
        } catch (e) {
            this.readingError(e.code);
            return;
        }
        this.addToRequest();
    }
};

module.exports = new Config();