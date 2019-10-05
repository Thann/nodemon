#!/usr/bin/env node

const path = require('path');
const chokidar = require('chokidar');
const { fork } = require('child_process');

module.exports = function(arg) {
  if (!process.send) {
    let child;
    const start = function() {
      if (child)
        child.kill();
      child = fork(process.argv[1]);
    };
    if (!arg) {
      arg = path.dirname(process.argv[1]);
    }
    chokidar.watch(arg).on('ready', start).on('change', start);
  }
  return !process.send;
}
