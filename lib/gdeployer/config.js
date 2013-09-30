
var util      = require("util"),
    path      = require("path"),
    SuperObj  = require("./super-obj"),
    evento     = require("evento"),
    translate = require("../translate/literal");


function Config(repoPath) {

    this.repoPath = repoPath;
};

util.inherits(Config, SuperObj);

module.exports = Config;


Config.prototype.fileName = "gdeployer.json";

Config.prototype.repoPath = null;


Config.prototype.parsConfig = function()
{
    this.config.destinationPath = path.resolve(this.config.destinationPath);
    this.config.repoPath        = this.repoPath;
    this.config.repoName        = path.basename(this.repoPath);
    this.config.archiveFile     = null;
    this.config.version         = this.config.version || "0.0.0";

    return this;
};

Config.prototype.readConf = function()
{
    evento.trigger("info", translate.reading_config);

    try {
        this.setConfig(require(this.repoPath + "/" + this.fileName));
    } catch (e) {
        this.readingError(e.code);
        return;
    }

    this.parsConfig()
        .readingSuccess();
};

Config.prototype.readingError = function(exceptionCode)
{
    var msg = exceptionCode === "MODULE_NOT_FOUND"
        ? translate.config_not_found
        : translate.config_corrupted;

    evento.trigger("error", msg);
};

Config.prototype.readingSuccess = function()
{
    evento.trigger("success", translate.config_detected);
    evento.trigger("configDetected");
};

Config.prototype.setRepoPath= function(repoPath)
{
    this.repoPath = repoPath;

    return this;
};
