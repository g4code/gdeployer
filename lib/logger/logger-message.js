
const ERROR     = "ERROR"
const SUCCESS   = "SUCCESS"
const INFO      = "INFO"
const WARNING   = "WARNING"
const LOADING   = "LOADING"

var LoggerMessage = function (text) {

    this.text = text.split(/\n/)
    this.multipleLines = this.text.length > 1
}

LoggerMessage.prototype = {

    type: null,

    error: function () {
        this.type = ERROR
        return this
    },

    success: function () {
        this.type = SUCCESS
        return this
    },

    info: function () {
        this.type = INFO
        return this
    },

    warning: function () {
        this.type = WARNING
        return this
    },

    loading: function () {
        this.type = LOADING
        return this
    }
}

module.exports = LoggerMessage

