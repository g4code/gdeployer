
var _            = require("underscore"),
    evento       = require("evento"),
    GitStatus    = require("../git/status")
    GitPull      = require("../git/pull"),
    GitCheckout  = require("../git/checkout"),
    GitLatestTag = require("../git/latest-tag");

function Git() {

};

Git.prototype = {

    request: null,


    notGitRepo: function()
    {
        evento.trigger("error", this.request.repository+" is not a git repo.");
    },
    
    onBranchPull: function()
    {
        var latestTag = new GitLatestTag();
        latestTag.setRepoPath(this.request.repository)
                 .exec()
                 .on("exec", _.bind(this.onLatestTag, this));
    },
    
    onCheckout: function()
    {
        evento.trigger("loading", "Running git pull on "+this.request.branchName+" branch");
        var pull = new GitPull();
        pull.branchName           = this.request.branchName;
        pull.remoteRepositoryName = this.request.remoteRepositoryName;
        pull.setRepoPath(this.request.repository)
            .exec()
            .on("exec", _.bind(this.onBranchPull, this));
    },
    
    onLatestTag: function(latestTag)
    {
        this.request.latestTag = latestTag;
        
        evento.trigger("git");
    },
    
    onPull: function()
    {
        evento.trigger("loading", "Checking out to branch "+this.request.branchName);
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
        pull.setRepoPath(this.request.repository)
            .exec()
            .on("exec", _.bind(this.onPull, this));
    },

    start: function()
    {
        evento.trigger("loading", "Checking if repository is git");
        var status = new GitStatus();
        status.setRepoPath(this.request.repository)
              .exec()
              .on("exec", _.bind(this.onStatus, this));
    }
};

module.exports = new Git();