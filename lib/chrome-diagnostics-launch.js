var child_process = require('child_process');
var fs = require('fs');
var path = require('path');
var urlformat = require('url').format;
var urlparse = require('url').parse;

function launch(url, options, callback) {
  if (!options) {
    options = {};
  }

  var args = [];
  if (options.port) {
    args.push('--port', options.port);
  }

  if (url && url.length) {
    var urlobj = urlparse(url, true);
    delete urlobj.search;
    url = urlformat(urlobj);

    args.push('--launch', url);
  }

  for (var i = 0; i < module.paths.length; i++) {
    var command = path.resolve(module.paths[i], 'chrome-diagnostics-adapter',
                               'bin', 'chrome-diagnostics-adapter');

    if (fs.existsSync(command)) {
      break;
    }
  }

  var process = child_process.spawn(command, args);
  if (callback) {
    process.stdout.on('data', function(chunk) {
      if (/server listening on port \d{4}/g.test(chunk.toString('utf-8'))) {
        callback(null)
      }
    });

    process.stderr.on('data', function(error) {
      callback(error);
    });
  }

  return process;
}

module.exports = launch;
