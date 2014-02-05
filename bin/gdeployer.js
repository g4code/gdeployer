#!/usr/bin/env node

/**
 * Module dependencies.
 */

var App     = require("../lib/app"),
program     = require("commander"),
packageData = require(__dirname + "/../package.json");

program.version(packageData.version)
   .usage("[options] [dir]")
   .option('-c, --config <n>', 'config file path, relative to repository path (default gdeployer.json)')
   .option('-r, --repository <n>', 'repository name (default origin)')
   .option('-b, --branch <n>', 'branch name (default master)')
   .parse(process.argv);

var app = new App();
app.args               = program.args;
app.configRelativePath = program.config;
app.repositoryName     = program.repository;
app.branchName         = program.branch;
app.init();
