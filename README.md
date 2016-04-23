# Chrome Diagnostics Launcher

Launcher for the [Chrome Diagnostics
Adapter](http://github.com/codajs/chrome-diagnostics-adapter) to make it
simpler to start an instance of the Chrome browser with multiplexing
diagnostics enabled.

## Installation

```console
npm install chrome-diagnostics-launcher
```

## Usage

```javascript
var launch = require('chrome-diagnostics-launch');

var options = {
  port: 9222,
};

var chrome = launch('http://google.com', options, function(error) {
  if (error) {
    return console.error(error);
  }

  console.log('Chrome launched. Go connect');
});

chrome.on('exit', function(code) {
  console.log('Chrome has exicted with code', code);
});

chrome.stdout.on('data', function(data) {
  console.log('chrome.stdout', data);
});

console.stderr.on('data', function(data) {
  console.log('chrome.stderr', data);
});
```

## License

MIT.
