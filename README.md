# nodemon
Auto-restart node apps!
(simpler alternative to the original [nodemon](https://github.com/remy/nodemon))


`npm install thann/nodemon`

`if (require('nodemon')()) return;`

And your app will restart on any changes to the folder it's in!

This is just a wrapper for `chokidar.watch(...)`,
so you can pass any of [those options](https://github.com/paulmillr/chokidar#api).

### CLI
You can also run arbitrary commands in the terminal like this:

`$ nodemon echo cool`

### Advanced
```javascript
const watcher = require('nodemon')(
  __dirname, // folder to watch
  {          // chokidar options
    ignored: /.*\/node_modules\/.*/
  }
);
if (watcher) {
  watcher.on('change', f => console.log('----- changed:', f));
  return;
}
```
