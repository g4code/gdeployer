
function Event() {

}

Event.prototype = {

    events: {},

    getEvents: function()
    {
        return this.events;
    },

    hasEvent: function(name)
    {
        return this.events[name] !== undefined;
    },

    off: function(name)
    {
        delete this.events[name];
    },

    on: function(name, callback)
    {
        this.events[name] = callback;
    },

    trigger: function(name, args)
    {
        if (this.hasEvent(name)) {

            this.events[name](args);
        }
    }
};

Event.instance = null;

Event.getInstance = function() {

    if (this.instance === null) {
        this.instance = new Event();
    }

    return this.instance;
};

module.exports = Event.getInstance();
