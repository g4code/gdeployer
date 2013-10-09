
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

Symlink.prototype.link = function()
{
    evento.trigger("info", translate.creating_symlink);

    fs.symlink(this.getSrcPath(), this.getDstPath(), 'dir', _.bind(this.onLink, this));
};

Symlink.prototype.onLink = function()
{
    evento.trigger("success", translate.symlink_created);
    evento.trigger("symlinkCreated");
};

Symlink.prototype.run = function()
{
    console.log(fs.existsSync(this.getDstPath()));

    fs.existsSync(this.getDstPath())
        ? this.unlink()
        : this.link();
};

Symlink.prototype.unlink = function()
{
    evento.trigger("info", translate.deleting_symlink);

    fs.unlink(this.getDstPath(), _.bind(this.link, this));
};