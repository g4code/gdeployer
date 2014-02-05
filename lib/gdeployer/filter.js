
var path   = require("path")
    evento = require("evento"),
    _      = require("underscore");

function Filter() {

};

Filter.prototype = {

    request: null,

    defaultBranchName: "master",

    defaultRepositoryName: "origin",

    branch: function()
    {
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
console.log(this.request);
        this.dir()
            .config()
            .branch()
            .repository();
        evento.trigger("info", "Repository: "+this.request.repository);
        evento.trigger("info", "Config: "    +this.request.configPath);
//        evento.trigger("filter");
    },

    getConfigPath: function()
    {
        return [
            this.request.repository,
            this.request.configPath
        ].join('/');
    },

    repository: function()
    {
        return this;
    }
};

module.exports = new Filter();