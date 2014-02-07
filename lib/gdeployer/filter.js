
var path   = require("path")
    evento = require("evento"),
    _      = require("underscore");

function Filter() {

};

Filter.prototype = {

    request: null,

    defaults: {
        branchName          : "master",
        remoteRepositoryName: "origin",
        latest              : "branch"
    },


    branch: function()
    {
        this.request.branchName = _.isUndefined(this.request.branchName)
            ? this.defaults.branchName
            : this.request.branchName;
        return this;
    },

    config: function()
    {
        this.request.configPath = path.resolve(this.getConfigPath());
        return this;
    },

    dir: function()
    {
        this.request.repository = path.resolve(this.request.args[0]);
        delete this.request.args;
        return this;
    },

    filter: function()
    {
        console.log(this.getLatestInfo());
        
        this.dir()
            .config()
            .branch()
            .repository()
            .latest();
        evento.trigger("info", "Repository: "            +this.request.repository);
        evento.trigger("info", "Config: "                +this.request.configPath);
        evento.trigger("info", "Branch name: "           +this.request.branchName);
        evento.trigger("info", "Remote repository name: "+this.request.remoteRepositoryName);
        evento.trigger("info", "Latest code from: "      +this.getLatestInfo());
        
        console.log(this.request);
        
        evento.trigger("filter");
    },
    
    getLatestInfo: function()
    {
        return _.isUndefined(this.request.tag)
            ? (this.request.latest == 'branch'
                ? this.request.branchName+" branch"
                : "latest tag")
            : this.request.tag+" tag";
    },
    
    getConfigPath: function()
    {
        return [
            this.request.repository,
            this.request.configPath
        ].join('/');
    },
    
    latest: function()
    {
        this.request.latest = _.isUndefined(this.request.latest)
            ? this.defaults.latest
            : this.request.latest;
        return this;
    },

    repository: function()
    {
        this.request.remoteRepositoryName = _.isUndefined(this.request.remoteRepositoryName)
            ? this.defaults.remoteRepositoryName
            : this.request.remoteRepositoryName;
        return this;
    }
};

module.exports = new Filter();