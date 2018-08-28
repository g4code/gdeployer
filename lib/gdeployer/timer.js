
function Timer() {
    this.startTime      = null
    this.endTime        = null
    this.executionTime  = null
}

Timer.prototype = {

    start: function()
    {
        this.startTime = new Date().getTime()
    },

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

    reset: function()
    {
        this.startTime      = null
        this.endTime        = null
        this.executionTime  = null
    }
}

module.exports = Timer
