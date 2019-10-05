#!/usr/bin/env node

const path = require('path');
const chokidar = require('chokidar');
const { fork } = require('child_process');

module.exports = function(bin, opts) {
  if (!process.send) {
    let child, mod;
    if (require.main === module) {
      bin = path.dirname(process.argv[2]);
      mod = path.join(process.cwd(), process.argv[2]);
    } else if (!bin) {
      bin = path.dirname(process.argv[1]);
    }
    const start = function() {
      if (child)
        child.kill();
      child = fork(mod || process.argv[1]);
    };
    chokidar.watch(bin, opts).on('ready', start).on('change', start);
  }
  return !process.send;
}

if (require.main === module) {
  module.exports();
}
