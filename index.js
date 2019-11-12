#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const { fork, spawn } = require('child_process');

module.exports = function(paths, opts) {
  if (!process.send) {
    let child, start;
    if (require.main === module) {  // CLI
      let bin = process.argv[2];
      if (fs.existsSync(bin))
        bin = path.join(paths, bin);
      start = function() {
        if (child) child.kill();
        child = spawn(bin, process.argv.slice(3), {
          stdio: 'inherit',
        });
      }
    } else {  // require()
      if (!paths)
        paths = path.dirname(process.argv[1]);
      start = function() {
        if (child) child.kill();
        child = fork(process.argv[1], process.argv.slice(2));
      }
    }
    return chokidar.watch(paths, opts).on('ready', start).on('change', start);
  }
  return false;
}

if (require.main === module) {  // CLI
  if (!process.argv[2]) throw "must pass argument!";
  module.exports(process.cwd());
}
