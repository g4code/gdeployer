#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program     = require("commander"),
    packageData = require(__dirname + "/../package.json");

program.version(packageData.version)
       .usage("[options] [dir]")
       .parse(process.argv);

console.log("version - " + packageData.version);
