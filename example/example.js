var launch = require('..');

var chrome = launch('http://google.com', {}, function(error) {
  if (error) {
    return console.log('Something went wrong when starting Chrome', error);
  }

  console.log('Chrome launched. Go connect');
});

chrome.on('exit', function(code) {
  console.log('Chrome has exited with code', code);
});

