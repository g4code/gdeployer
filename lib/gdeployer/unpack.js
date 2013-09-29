
var util      = require("util"),
    path      = require("path"),
    fs        = require("fs"),
    _         = require("underscore"),
    evento     = require("evento"),
    translate = require("../translate/literal"),
    SuperObj  = require("./super-obj")
    Unzip     = require("../exec/unzip");

function Unpack() {

};

util.inherits(Unpack, SuperObj);

module.exports = Unpack;


Unpack.prototype.unzip = null;


Unpack.prototype.getFileName = function()
{
    return path.basename(this.config.archiveFile);
};

Unpack.prototype.getOutputName = function()
{
    return path.basename(this.config.archiveFile, ".zip") + this.config.version;
};

Unpack.prototype.getOutputFullPath = function()
{
    return path.dirname(this.config.archiveFile) + "/" + this.getOutputName();
};

Unpack.prototype.onUnzip = function()
{
    if (!this.unzip.fileExtracted) {

        evento.trigger("error", translate.cannot_extract_archive);
        return;
    }

    this.config.latestVersionFileName = this.unzip.getOutput();

    evento.trigger("success", translate.archive_extracted);
    evento.trigger("archiveExtracted");
};

Unpack.prototype.outputFileExists = function()
{
    return fs.existsSync(this.getOutputFullPath());
};

Unpack.prototype.run = function()
{
    if (this.outputFileExists()) {

        evento.trigger("error", translate.unpack_destination_exists + " - " + this.getOutputName());
        return;
    }

    evento.trigger("info", translate.unpacking_archive);

    this.unzip = new Unzip();
    this.unzip.setDirPath(this.config.destinationPath)
              .setFileName(this.getFileName())
              .setOutput(this.getOutputName())
              .exec()
              .on("exec", _.bind(this.onUnzip, this));
};