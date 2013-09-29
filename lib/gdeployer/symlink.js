
var util       = require("util"),
    fs         = require("fs"),
    _          = require("underscore"),
    SuperObj   = require("./super-obj"),
    evento      = require("evento"),
    translate  = require("../translate/literal");

function Symlink() {

};

util.inherits(Symlink, SuperObj);

module.exports = Symlink;


Symlink.prototype.getDstPath = function()
{
    return this.config.destinationPath + "/" + this.config.repoName;
};

Symlink.prototype.getSrcPath = function()
{
    return this.config.destinationPath + "/" + this.config.latestVersionFileName;
};

Symlink.prototype.run = function()
{
    evento.trigger("info", translate.creating_symlink);

    if (fs.existsSync(this.getDstPath())) {

        fs.unlinkSync(this.getDstPath());
    }

    fs.symlinkSync(this.getSrcPath(), this.getDstPath(), 'dir');

    evento.trigger("success", translate.symlink_created);
};