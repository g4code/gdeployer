gdeployer
=========

> Automated deployment tool - [nodejs](http://nodejs.org) library


[![NPM](https://nodei.co/npm/gdeployer.png)](https://nodei.co/npm/gdeployer/)

## Install
```bash
$ npm install -g gdeployer
```

## Usage
```bash
Usage: gdeployer [options] [dir]

Options:
    -h, --help            output usage information
    -V, --version         output the version number
    -c, --config <n>      config file path, relative to repository path (default gdeployer.json)
    -r, --repository <n>  repository name (default origin)
    -b, --branch <n>      branch name (default master)
    -f, --from <n>        deploy version from (branch || tag) (default branch)
    -t, --tag <n>         deploy version from tag name
    -e, --export <n>      reletive path from deploy path, where to export version file
```
eg
```bash
$ gdeployer --help
$ gdeployer --version
    
# deploy latest code from branch
$ gdeployer --config configs/production.json --repository origin --branch develop --from branch /repo/path
    
# deploy code from latest tag
$ gdeployer --config configs/production.json --from tag /repo/path
    
# deploy code from specific tag
$ gdeployer --config configs/production.json --tag 0.5.0 /repo/path

# export version name and timestamp to a file
$ gdeployer --config configs/production.json --export ./public /repo/path
```

## Config

Create gdeployer.json config file and put to repository root directory

Config file options:
```js
{
  "destinationPath": "deployment/path",
  "versionsToKeep": 4,
  "changeFileOwner": "www",
  "tasks": {
    "before": [
      "echo before live task"
    ],
    "after": [
      "echo after live task"
    ]
  }
}
```

## License

(The MIT License)
see [LICENSE](https://github.com/g4code/gdeployer/blob/master/LICENSE) file for details...
