
var util      = require("util"),
    path      = require("path"),
    _         = require("underscore"),
    SuperObj  = require("./super-obj"),
    evento    = require("evento"),
    translate = require("../translate/literal");

/**
 * Construct
 */
function Config() {
};

/**
 * Extend gdeployer super object
 */
util.inherits(Config, SuperObj);

/**
 * Module export
 * @returns {Config}
 */
module.exports = Config;

Config.prototype.configRelativePath = null;

/**
 * Config file name
 */
Config.prototype.fileName = "gdeployer.json";

Config.prototype.repoPath = null;


Config.prototype.getConfigPath = function()
{
    return path.resolve(
        this.repoPath
        + "/"
        + (_.isUndefined(this.configRelativePath) ? this.fileName : this.configRelativePath)
    );
};

/**
 * Fix config data
 */
Config.prototype.parsConfig = function()
{
    this.config.destinationPath = path.resolve(this.config.destinationPath);
    this.config.repoPath        = this.repoPath;
    this.config.repoName        = path.basename(this.repoPath);
    this.config.archiveFile     = null;
    this.config.version         = this.config.version || "0.0.0";
    this.config.tasks           = _.isObject(this.config.tasks) ? this.config.tasks : {};
    this.config.tasks.before    = _.isArray(this.config.tasks.before) ? this.config.tasks.before : [];
    this.config.tasks.after     = _.isArray(this.config.tasks.after) ? this.config.tasks.after : [];

    return this;
};

Config.prototype.readConf = function()
{
    evento.trigger("info", translate.reading_config);
    try {
        this.setConfig(require(this.getConfigPath()));
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

Config.prototype.setConfigRelativePath = function(configRelativePath)
{
    this.configRelativePath = configRelativePath;
    return this;
};

Config.prototype.setRepoPath= function(repoPath)
{
    this.repoPath = repoPath;
    return this;
};
