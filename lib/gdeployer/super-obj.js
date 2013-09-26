
function SuperObj() {

};

module.exports = SuperObj;

SuperObj.prototype = {

    config: null,

    getConfig: function()
    {
        return this.config;
    },

    hasConf: function()
    {
        return this.config !== null;
    },

    setConfig: function(config)
    {
        this.config = config;

        return this;
    }
};
