#!/usr/bin/env node

const path = require('path');
const cluster = require('cluster');
const chokidar = require('chokidar');

module.exports = function(arg) {
  if (cluster.isMaster) {
    let child;
    const start = function() {
      if (child)
        child.kill();
      child = cluster.fork();
    };
    if (!arg) {
      arg = path.dirname(process.argv[1]);
    }
    chokidar.watch(arg).on('ready', start).on('change', start);
  }
  return cluster.isMaster;
}
