
function Timer() {
    this.startTime      = null
    this.endTime        = null
    this.executionTime  = null
}

Timer.prototype = {

    end: function()
    {
        this.endTime = new Date().getTime()
    },

    getExcutionTime: function()
    {
        return (this.endTime - this.startTime)/1000
    },

    getExcutionTimeFormatted: function()
    {
        return this.getExcutionTime() + " s"
    },

    isStarted: function()
    {
        return this.startTime !== null
    },

    reset: function()
    {
        this.startTime      = null
        this.endTime        = null
        this.executionTime  = null
    },

    start: function()
    {
        this.startTime = new Date().getTime()
    }
}

module.exports = Timer
