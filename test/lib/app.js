
var should = require("chai").should(),
    suite  = require("../suite"),
    App    = require(suite.path("app"));

describe("App", function(){

    describe("init", function(){

        it("shoud call check for config", function(done){

            var app = new App();
            app.checkForConfig = function(){
                "test".should.be.ok;
                done();
            };
            app.init();
        });
    });

    describe("checkForConfig", function(){

        it("directory has no config call cli message", function(){

            var app = new App();
            app.
            app.checkForConfig();
        });
    });
});