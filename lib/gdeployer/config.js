
var event     = require("../event"),
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

    readConf: function()
    {
        event.trigger("info", translate.reading_config);

        try {

            this.conf = require(this.repoPath + "/" + this.fileName);

            event.trigger("success", translate.config_detected);

        } catch (e) {

            this.readingError(e.code);
        }
    },

    readingError: function(exceptionCode)
    {
        var msg = exceptionCode === "MODULE_NOT_FOUND"
            ? translate.config_not_found
            : translate.config_corrupted;

        event.trigger("error", msg);
    },

    setRepoPath: function(repoPath)
    {
        this.repoPath = repoPath;

        return this;
    }
};