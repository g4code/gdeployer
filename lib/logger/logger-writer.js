
var fs      = require("fs")
var path    = require("path")
var evento  = require("evento")
var swig    = require('swig')

var LoggerWriter = function(request) {

    this.request = request
}

LoggerWriter.prototype = {

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

    write: function(messages)
    {
        this.createLogDir()

        if (this.logDirPathExists) {
            this.writeToJson(messages)
            this.writeToHtml(messages)
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

    makeTemplateData: function(messages)
    {
        return {
            messages: messages,
            version: this.request.version,
            datetime: this.request.datetime,
            repoName: this.request.repoName
        }
    },

    writeToHtml: function(messages)
    {
        var template = swig.renderFile(__dirname + '/../../templates/log.html', this.makeTemplateData(messages))

        fs.writeFile(
            this.request.log.htmlPath,
            template,
            this.onHtmlWrite.bind(this)
        )
    },

    writeToJson: function(messages)
    {
        fs.writeFile(
            this.request.log.jsonPath,
            JSON.stringify(messages, null, 2),
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