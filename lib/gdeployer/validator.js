
var _      = require("underscore"),
    fs     = require("fs"),
    path   = require("path"),
    evento = require("evento");

function Validator() {

};

Validator.prototype = {

    request: null,

    defaultConfigName: "gdeployer.json",


    checkArgs: function()
    {
        if (!this.isArgValid()) {
            throw "no dir argument";
        }
        try {
            this.isDir(this.request.args[0]);
        } catch (e) {
            throw this.request.args[0] + " is not a directory";
        }
        return this;
    },

    checkConfig: function()
    {
        try {
             this.isFile(this.getConfigPath());
        } catch (e) {
            throw this.getConfigPath() + " does not exist";
        }
        return this;
    },
    
    checkFrom: function()
    {
        if (!_.isUndefined(this.request.from) && !this.isFromValid()) {
            throw this.request.from + ' is not a valid option for from';
        }
        return this;
    },

    getConfigPath: function()
    {
        return path.resolve([
           this.request.args[0],
           (this.isConfigPathSet()
               ? this.request.configPath
               : this.defaultConfigName)
        ].join("/"));
    },

    isArgValid: function()
    {
        return _.isArray(this.request.args)
            && this.request.args.length == 1;
    },

    isConfigPathSet: function()
    {
        return !_.isUndefined(this.request.configPath);
    },

    isDir: function(path)
    {
        stats = fs.lstatSync(path);
        if (!stats.isDirectory()) {
            throw "err";
        }
    },

    isFile: function(path)
    {
        stats = fs.lstatSync(path);
        if (!stats.isFile()) {
            throw "err";
        }
    },
    
    isFromValid: function()
    {
        return this.request.from === 'branch'
            || this.request.from === 'tag';
    },

    validate: function()
    {
        try {
            this.checkArgs()
                .checkConfig()
                .checkFrom();
            evento.trigger("EVENT_VALID");
        } catch(err) {
            evento.trigger("INFORMER_ERROR", err);
        }
    }
};

module.exports = new Validator();