#!/usr/bin/env node

/**
 * Module dependencies.
 */

var App         = require("../lib/app"),
program     = require("commander"),
packageData = require(__dirname + "/../package.json");

program.version(packageData.version)
   .usage("[options] [dir]")
   .parse(process.argv);

var app = new App();
app.setArgs(program.args)
   .init();
