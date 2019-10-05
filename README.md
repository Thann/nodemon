# chode
Auto-restart node apps using chokidar!


`npm install thann/chode`

`if (require('chode')()) return;`

And your app will restart on any changes to the folder it's in!

This is just a wrapper for `chokidar.watch(...)`,
so you can pass any of [those options](https://github.com/paulmillr/chokidar#api).
