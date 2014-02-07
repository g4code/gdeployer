
var util  = require("util"),
    _     = require("underscore"),
    Super = require("./super");

function Tag() {

};

module.exports = Tag;

util.inherits(Tag, Super);

Tag.prototype.rawData = "";

Tag.prototype.tags = [];

Tag.prototype.exec = function() {

    return this.doExec("git tag");
};

Tag.prototype.onExecCallback = function(error, stdout, stderr)
{
    this.setRawData(stdout)
        .splitRawDataToTags()
        .filterTags();

    this.emit("exec", this.tags);
};

Tag.prototype.filterTags = function()
{
    this.tags = _.compact(this.tags);
};

Tag.prototype.hasTags = function()
{
    return this.tags.length > 0;
};

Tag.prototype.setRawData = function(rawData)
{
    this.rawData = rawData;
    return this;
};

Tag.prototype.splitRawDataToTags = function()
{
    this.tags = this.rawData.split("\n");
    return this;
};
