
var path = require("path");

var suite = {

    mock: function(mockName)
    {
        return path.resolve(__dirname + "/mocks/" + mockName);
    },

    path: function(moduleName)
    {
        return path.resolve(__dirname + "/../lib/" + moduleName);
    }
};

module.exports = suite;