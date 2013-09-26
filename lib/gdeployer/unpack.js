
var util      = require("util"),
    event     = require("../event"),
    translate = require("../translate/literal"),
    SuperObj  = require("./super-obj");

function Unpack() {

};

util.inherits(Unpack, SuperObj);

module.exports = Unpack;

Unpack.prototype.run = function(){

//    event.trigger("info", translate.unpacking_archive)

//    this.gitArchive = new GitArchive();
//    this.gitArchive.setDirPath(this.config.repoPath)
//                   .setOutput(this.getArchiveOutput())
//                   .exec()
//                   .on("exec", _.bind(this.onArchive, this));
};