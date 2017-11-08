
var informer        = require("informer")
var evento          = require("evento")
var LoggerMessage   = require("./logger-message")

const ERROR     = "ERROR"
const SUCCESS   = "SUCCESS"
const INFO      = "INFO"
const WARNING   = "WARNING"
const LOADING   = "LOADING"


function Logger() {

    evento.on("INFORMER_ERROR",   this.error.bind(this))
    evento.on("INFORMER_SUCCESS", this.success.bind(this))
    evento.on("INFORMER_INFO",    this.info.bind(this))
    evento.on("INFORMER_WARNING", this.warning.bind(this))
    evento.on("INFORMER_LOADING", this.loading.bind(this))
}

Logger.prototype = {

    messages: [],

    error: function (message) {

        this.messages.push(new LoggerMessage(message).error())
        informer.error(message)
    },

    success: function (message) {

        this.messages.push(new LoggerMessage(message).success())
        informer.success(message)
    },

    info: function (message) {

        this.messages.push(new LoggerMessage(message).info())
        informer.info(message)
    },

    warning: function (message) {

        this.messages.push(new LoggerMessage(message).warning())
        informer.warning(message)
    },

    loading: function (message) {

        this.messages.push(new LoggerMessage(message).loading())
        informer.loading(message)
    },

    log: function(loggerWriter)
    {
        !loggerWriter.hasLogPath() &&
            informer.info("Nothing to write to log: logPath missing")

        loggerWriter.logPathExists()
            ? loggerWriter.write(this.messages)
            : informer.info("logPath does not exist")
    }
}

module.exports = Logger