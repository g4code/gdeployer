
var util   = require("util"),
    Super  = require("./super");

function Checkout() {

};

module.exports = Checkout;

util.inherits(Checkout, Super);

Checkout.prototype.branchName = null;

Checkout.prototype.exec = function()
{
    return this.doExec("git checkout "+this.branchName);
};