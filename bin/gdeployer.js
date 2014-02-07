#!/usr/bin/env node

var Gdeployer = require("../lib/gdeployer"),
commander     = require("commander"),
packageData   = require(__dirname + "/../package.json");

commander.version(packageData.version)
   .usage("[options] [dir]")
   .option('-c, --config <n>',     'config file path, relative to repository path (default gdeployer.json)')
   .option('-r, --repository <n>', 'repository name (default origin)')
   .option('-b, --branch <n>',     'branch name (default master)')
   .option('-l, --latest <n>',     'latest code (branch || tag) (default branch)')
   .option('-t, --tag <n>',        'tag name')
   .parse(process.argv);

var gdeployer = new Gdeployer();
gdeployer.request.args                 = commander.args;
gdeployer.request.configPath           = commander.config;
gdeployer.request.remoteRepositoryName = commander.repository;
gdeployer.request.branchName           = commander.branch;
gdeployer.request.latest               = commander.latest;
gdeployer.request.tag                  = commander.tag;
gdeployer.run();
