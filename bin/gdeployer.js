#!/usr/bin/env node

/**
 * Module dependencies.
 */

var App     = require("../lib/app"),
program     = require("commander"),
packageData = require(__dirname + "/../package.json");

program.version(packageData.version)
   .usage("[options] [dir]")
   .option('-c, --config <n>', 'config file path (relative to repository path)')
   .parse(process.argv);

var app = new App();
app.setArgs(program.args)
   .setConfigRelativePath(program.config)
   .init();
