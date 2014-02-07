
var util   = require("util"),
    Super  = require("./super");

function Checkout() {

};

module.exports = Checkout;

util.inherits(Checkout, Super);

Checkout.prototype.branchName = null;

Checkout.prototype.exec = function()
{
    console.log("git checkout "+this.branchName);
    return this.doExec("git checkout "+this.branchName);
};

Checkout.prototype.onExecCallback = function(error, stdout, stderr)
{
    console.log(stdout, stderr);

    this.emit("exec");
};