
var fs      = require("fs")
var path    = require("path")
var evento  = require("evento")
var swig    = require('swig')

var LoggerWriter = function(request) {

    this.request = request
}

LoggerWriter.prototype = {

    messages: [],

    summery: {},

    hasLogPath: function()
    {
        return this.request.log.logPath !== null
    },

    logDirPathExists: function()
    {
        return fs.existsSync(this.request.log.dirPath)
    },

    logPathExists: function()
    {
        return this.hasLogPath()
            && fs.existsSync(this.request.log.logPath)
    },

    write: function(messages, summery)
    {
        this.messages = messages
        this.summery = summery

        this.createLogDir()

        if (this.logDirPathExists) {
            this.writeToJson()
            this.writeToHtml()
        }
    },

    createLogDir: function ()
    {
        try {
            fs.mkdirSync(this.request.log.dirPath)
            evento.trigger("INFORMER_SUCCESS", "Created log dir: " + this.request.log.dirPath);
        } catch (exception) {
            evento.trigger("INFORMER_WARNING", "Unable to create log dir: " + this.request.log.dirPath);
        }
    },

    makeTemplateData: function()
    {
        return {
            messages        : this.messages,
            version         : this.request.version,
            datetime        : this.request.datetime,
            executionTime   : this.request.executionTime,
            repoName        : this.request.repoName,
            summary         : this.summery
        }
    },

    writeToHtml: function()
    {
        var template = swig.renderFile(__dirname + '/../../templates/log.html', this.makeTemplateData(this.messages))

        fs.writeFile(
            this.request.log.htmlPath,
            template,
            this.onHtmlWrite.bind(this)
        )
    },

    writeToJson: function()
    {
        fs.writeFile(
            this.request.log.jsonPath,
            JSON.stringify(this.messages, null, 2),
            this.onJsonWrite.bind(this)
        )
    },

    onHtmlWrite: function(error)
    {
        if (error) {
            evento.trigger("INFORMER_WARNING", "Unable to write data to log: " + this.request.log.htmlPath);
        } else {
            evento.trigger("INFORMER_SUCCESS", "Log saved to: " + this.request.log.htmlPath);
        }
    },

    onJsonWrite: function(error)
    {
        if (error) {
            evento.trigger("INFORMER_WARNING", "Unable to write data to log: " + this.request.log.jsonPath);
        } else {
            evento.trigger("INFORMER_SUCCESS", "Log saved to: " + this.request.log.jsonPath);
        }
    }
}

module.exports = LoggerWriter