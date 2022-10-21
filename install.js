const { readFile, writeFile, promises: fsPromises } = require('fs');

var exec = require('child_process').execFile;
var bat = 'cmd.exe';
var outputFile = '--type';

if (process.argv.length != 4) {
	console.log("Missing vid or pid");
	process.exit();
}

// Validate user input
if (!process.argv[2].match(/\b([\da-fA-F]{4})\b/) || !process.argv[3].match(/\b([\da-fA-F]{4})\b/)) {
	console.log('Invalid VID or PID. Example: node install 8087 0AAA');
	process.exit();
}

var vid = '0x' + process.argv[2];
var pid = '0x' + process.argv[3];
var param = ['/c', 'start', '""', './driver/wdi-simple.exe', outputFile, '0', '--name', Math.random().toString(36).substring(7), '--vid', vid, '--pid', pid];
var fs = require('fs');

if (process.argv.length >= 4) {

	// Update bluetooth-hci-socket with vip pid
	readFile('./node_modules/bluetooth-hci-socket/lib/usb.js', 'utf-8', function (err, contents) {
		if (err) {
			console.log(err);
		}

		const replaced = contents.replace(/this._usbDevice = usb.findByIds\(0x/gi, `this._usbDevice = usb.findByIds(${vid}, ${pid}) || usb.findByIds(0x`);

		writeFile('./node_modules/bluetooth-hci-socket/lib/usb.js', replaced, 'utf-8', function (err) {
			console.log(err);
		});
	});

	fs.writeFile(outputFile, '', (err) => {
		if (err) throw err;
	});

	exec(bat, param, () => { });

	fs.watch(outputFile, () => {
		const data = fs.readFileSync(outputFile, { encoding: 'utf8' });
		if (data !== '' && data.includes('success')) {
			console.log('Install Success');
			process.exit();
		} else if (data.includes(',')) {
			console.log('Install Failed');
			process.exit();
		}
	});

} else {
	console.log("Missing vid or pid");
	process.exit();
}
