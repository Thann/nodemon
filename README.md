# chode
Auto-restart node apps using chokidar!


`npm install thann/chode`

`if (require('chode')()) return;`

And your app will restart on any changes to the folder it's in!

This is just a wrapper for `chokidar.watch(...)`,
so you can pass any of [those options](https://github.com/paulmillr/chokidar#api).

### CLI
You can also run arbitrary commands in the terminal like this:

`$ chode echo cool`

### Advanced
```javascript
const watcher = require('chode')(
  __dirname, // folder to watch
  {          // chokidar options
    ignored: /.*\/node_modules\/.*/
  },
  {          // library options
    killSignal: 'SIGTERM'
  }
);
if (watcher) {
  watcher.on('change', f => console.log('----- changed:', f));
  return;
}
```
See [test.js](./test.js) for an example app.
