gdeployer
=========

> Automated deployment tool - [nodejs](http://nodejs.org) library

## Install

    $ npm install -g gdeployer

## Usage

    Usage: gdeployer [options] [dir]

    Options:
        -h, --help     output usage information
        -V, --version  output the version number

eg

    $ gdeployer /repo/path

## Config

Create gdeployer.json config file and put to repository root directory

Config file options

    {
      "destinationPath": "deployment/path",
      "version":  "0.0.0"
    }
    {
    "version": "0.0.0",
    "destinationPath": "deployment/path",
    "tasks": {
        "before": [
            "some task command",
        ],
        "after": [
            "some task command"
        ]
    }
}

## License

(The MIT License)

Copyright (c) 2013 Drasko Gomboc <drasko.gomboc@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

