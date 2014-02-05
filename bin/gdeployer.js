#!/usr/bin/env node

/**
 * Module dependencies.
 */

var Gdeployer = require("../lib/gdeployer"),
program       = require("commander"),
packageData   = require(__dirname + "/../package.json");

program.version(packageData.version)
   .usage("[options] [dir]")
   .option('-c, --config <n>', 'config file path, relative to repository path (default gdeployer.json)')
   .option('-r, --repository <n>', 'repository name (default origin)')
   .option('-b, --branch <n>', 'branch name (default master)')
   .parse(process.argv);

var gdeployer = new Gdeployer();
gdeployer.request.args                 = program.args;
gdeployer.request.configPath           = program.config;
gdeployer.request.remoteRepositoryName = program.repository;
gdeployer.request.branchName           = program.branch;
gdeployer.run();
