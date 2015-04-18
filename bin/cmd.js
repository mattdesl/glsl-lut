#!/usr/bin/env node

var fs = require('fs')
var path = require('path')

var file = path.resolve(__dirname, '..', 'image', 'lookup.png')
fs.createReadStream(file)
  .pipe(process.stdout)