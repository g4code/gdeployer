
var _           = require("underscore"),
    evento      = require("evento"),
    GitStatus   = require("../git/status")
    GitPull     = require("../git/pull"),
    GitCheckout = require("../git/checkout");
//    GitTagLog = require("../git/tag-log"),
//    GitTag    = require("../git/tag"),
//    GitLog    = require("../git/log");

function Git() {

};

Git.prototype = {

    request: null,


    notGitRepo: function()
    {
        evento.trigger("error", this.request.repository+" is not a git repo.");
    },
    
    onCheckout: function(response)
    {
        console.log(response);
    },
    
    onPull: function(response)
    {
        console.log(response.stdout);
        console.log(response.stderr);
        
        var checkout = new GitCheckout();
        checkout.branchName = this.request.branchName;
        checkout.setRepoPath(this.request.repository)
                .exec()
                .on("exec", _.bind(this.onCheckout, this));
    },

    onStatus: function(isGitRepo)
    {
        isGitRepo ? this.pullFromRemoteRepo() : this.notGitRepo();
    },
    
    pullFromRemoteRepo: function()
    {
        evento.trigger("loading", "Running git pull");
        var pull = new GitPull();
        pull.branchName           = this.request.branchName;
        pull.remoteRepositoryName = this.request.remoteRepositoryName;
        pull.setRepoPath(this.request.repository)
            .exec()
            .on("exec", _.bind(this.onPull, this));
    },

    start: function()
    {
        evento.trigger("loading", "Checking if repo is git");
        var status = new GitStatus();
        status.setRepoPath(this.request.repository)
              .exec()
              .on("exec", _.bind(this.onStatus, this));
    }
};

module.exports = new Git();