
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
    
    checkLatest: function()
    {
        if (!_.isUndefined(this.request.latest) && !this.isLatestValid()) {
            throw this.request.latest + ' is not a valid option for latest';
        }
        return this;
    },

    getConfigPath: function()
    {
        return this.isConfigPathSet()
            ? this.request.configPath
            : path.resolve(this.request.args[0]+"/"+this.defaultConfigName);
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
    
    isLatestValid: function()
    {
        return this.request.latest === 'branch'
            || this.request.latest === 'tag';
    },

    validate: function()
    {
        try {
            this.checkArgs()
                .checkConfig()
                .checkLatest();
            evento.trigger("valid");
        } catch(err) {
            evento.trigger("error", err);
        }
    }
};

module.exports = new Validator();