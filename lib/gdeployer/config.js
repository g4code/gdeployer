
var path      = require("path"),
    event     = require("../event"),
    translate = require("../translate/literal");


function Config(repoPath) {

    this.repoPath = repoPath;
};

module.exports = Config;

Config.prototype = {

    conf: null,

    fileName: "gdeployer.json",

    repoPath: null,

    hasConf: function()
    {
        return this.conf !== null;
    },

    parsConf: function()
    {
        this.conf.destinationPath = path.resolve(this.conf.destinationPath);
        this.conf.repoPath        = this.repoPath;

        return this;
    },

    readConf: function()
    {
        event.trigger("info", translate.reading_config);

        try {
            this.setConf();
        } catch (e) {
            this.readingError(e.code);
            return;
        }

        this.parsConf()
            .readingSuccess();
    },

    readingError: function(exceptionCode)
    {
        var msg = exceptionCode === "MODULE_NOT_FOUND"
            ? translate.config_not_found
            : translate.config_corrupted;

        event.trigger("error", msg);
    },

    readingSuccess: function()
    {
        event.trigger("success", translate.config_detected);
        event.trigger("configDetected");
    },

    setConf: function()
    {
        this.conf = require(this.repoPath + "/" + this.fileName);
    },

    setRepoPath: function(repoPath)
    {
        this.repoPath = repoPath;

        return this;
    }
};