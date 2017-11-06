
var informer    = require("informer")
var evento      = require("evento")

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

        informer.error(message)
    },

    success: function (message) {

        informer.success(message)
    },

    info: function (message) {

        informer.info(message)
    },

    warning: function (message) {

        informer.warning(message)
    },

    loading: function (message) {

        informer.loading(message)
    }
}

module.exports = Logger