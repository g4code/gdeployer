#!/usr/bin/env node

var Gdeployer = require("../lib/gdeployer"),
commander     = require("commander"),
packageData   = require(__dirname + "/../package.json");

commander.version(packageData.version)
   .usage("[options] [dir]")
   .option('-c, --config <n>',     'config file path, relative to repository path (default gdeployer.json)')
   .option('-r, --repository <n>', 'repository name (default origin)')
   .option('-b, --branch <n>',     'branch name (default master)')
   .option('-f, --from <n>',       'deploy version from (branch || tag) (default branch)')
   .option('-t, --tag <n>',        'deploy version from tag name')
   .option('-e, --export <n>',     'reletive path from deploy path, where to export version file')
   .parse(process.argv);

var gdeployer = new Gdeployer();
gdeployer.request.args                 = commander.args;
gdeployer.request.configPath           = commander.config;
gdeployer.request.remoteRepositoryName = commander.repository;
gdeployer.request.branchName           = commander.branch;
gdeployer.request.from                 = commander.from;
gdeployer.request.tag                  = commander.tag;
gdeployer.request.exportTo             = commander["export"]
gdeployer.run();
