
var fs       = require("fs"),
    path     = require('path'),
    _        = require("underscore");

function Versions(request) {

    this.request = request;
    console.log(request);
};

Versions.prototype = {

    markedForDelete: [],

    all: {},

    times: [],

    sliceTimes: function()
    {
        this.times = _.sortBy(this.times, function(num) {
            return num;
        }).reverse().slice(0, this.request.versionsToKeep);
    },

    getMarkedForDelete: function()
    {
        fs.readdirSync(this.request.destinationPath).filter(_.bind(this.isDir, this));
        this.sliceTimes();
        var self = this;
        _.each(this.all, function(time, file){
            if (_.indexOf(self.times, time) === -1) {
                self.markedForDelete.push(file);
            }
        });
        return this.markedForDelete;
    },

    isDir: function(file)
    {
        var stats = fs.lstatSync(path.join(this.request.destinationPath, file));
        if (stats.isDirectory()) {
            this.all[file] = stats.mtime.getTime();
            this.times.push(stats.mtime.getTime());
        }
    },
};

module.exports = Versions;