process.chdir('..');
process.env.NODE_ENV = 'autotest22'; // autotest for not 10.8.0.22 run.

var nodeArgs = ['--harmony', '/bin/tia.js'];
var procArgs = process.argv.slice(2);
if (procArgs.length === 0) {
	// Default arguments.
	nodeArgs = nodeArgs.concat('tests/app', '-m');
} else {
	// Overrided arguments, probably for debug.
	nodeArgs = nodeArgs.concat(procArgs);
}

console.log('bamboo.js: node arguments: ' + nodeArgs.join());

var childProcess = require('child_process');

// We use sails module from parent directory.
var app = require('sails'); //sails/lib/app()

function callbackDone(arg) {
	console.log('bamboo.js: sails app stopped.');
	process.exit(); // Without this the process will not leave. I don't know why.
}

app.lift(
		{
			port: 1338,
			log: {
				level: 'error'
			}
		},
		function(err, server) {
			console.log('bamboo.js: sails app started.');
			if (err) {
				console.error('ERROR: App not started:')
				console.error(err);
			}

			process.chdir('test');

			var cp = childProcess.spawn(
					'node',
					nodeArgs,
					{stdio: 'inherit'}
			);

			cp.on('close', function(code) {
				console.log('bamboo.js: tests exited with code ' + code);
				process.exitCode = code;
				app.lower(callbackDone)
			});
		})
;


