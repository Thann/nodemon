#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const { fork, spawn } = require('child_process');

module.exports = function(paths, chokidarOpts, opts) {
  if (!process.send) {
    let child, start;
    if (require.main === module) {  // CLI
      let bin = process.argv[2];
      if (bin[0] !== '/' && fs.existsSync(bin))
        bin = path.join(paths, bin);
      start = async function() {
        if (child) await kill(child, opts && opts.killSignal);
        child = spawn(bin, process.argv.slice(3), {
          stdio: 'inherit',
        });
      }
    } else {  // require()
      if (!paths)
        paths = path.dirname(process.argv[1]);
      start = async function() {
        if (child) await kill(child, opts && opts.killSignal);
        child = fork(process.argv[1], process.argv.slice(2));
      }
    }
    return chokidar.watch(paths, chokidarOpts).on('ready', start).on('change', start);
  }
  return false;
}

function kill(child, signal) {
    // Immediatly return if already exited
    if (child.exitCode !== null) return;
    const p = new Promise(accept => child.on('exit', accept));
    child.kill(signal);
    return p;
}

if (require.main === module) {  // CLI
  if (!process.argv[2]) throw "must pass argument!";
  module.exports(process.cwd());
}
