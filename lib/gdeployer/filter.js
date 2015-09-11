
var path   = require("path"),
    evento = require("evento"),
    _      = require("underscore");

function Filter() {

};

Filter.prototype = {

    request: null,

    defaults: {
        branchName          : "master",
        remoteRepositoryName: "origin",
        from              : "branch"
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
        this.dir()
            .config()
            .branch()
            .repository()
            .from();
        evento.trigger("INFORMER_INFO", "Repository: "            +this.request.repository);
        evento.trigger("INFORMER_INFO", "Config: "                +this.request.configPath);
        evento.trigger("INFORMER_INFO", "Branch name: "           +this.request.branchName);
        evento.trigger("INFORMER_INFO", "Remote repository name: "+this.request.remoteRepositoryName);
        evento.trigger("INFORMER_INFO", "Code from: "             +this.getFromInfo());

        evento.trigger("filter");
    },

    getFromInfo: function()
    {
        return _.isUndefined(this.request.tag)
            ? (this.request.from == 'branch'
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

    from: function()
    {
        this.request.from = _.isUndefined(this.request.from)
            ? this.defaults.from
            : this.request.from;
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