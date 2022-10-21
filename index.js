// var HID = require('node-hid');
// var devices = HID.devices();

var usb = require('usb');
console.log(usb.getDeviceList());

/* Keyboard printer */
// const keyboard = usb.findByIds(7247, 2);
// console.log(keyboard);

/* Mouse printer */
// const mouse = usb.findByIds(1112, 58);
// console.log(mouse);

/* Devices printer */
// const printer = usb.findByIds(0x1FC9, 0x2016);
// console.log(printer);

// printer.open();
// printer.interfaces[0].claim();

// // printer.interfaces[0].endpoints[1].startPoll(1,8);
// printer.interfaces[0].endpoints[1].transfer(128, (err) => {
//   if(err) throw err;
// });


/* Code for usb detection */
var usbDetect = require('usb-detection');
usbDetect.startMonitoring();

// Detect add or remove (change)
usbDetect.on('change', function(device) { console.log('change', device); });
// usbDetect.on('change:vid', function(device) { console.log('change', device); });
// usbDetect.on('change:vid:pid', function(device) { console.log('change', device); });


// Get a list of USB devices on your system, optionally filtered by `vid` or `pid`
// usbDetect.find(function(err, devices) { console.log('find', devices, err); });
// usbDetect.find(vid, function(err, devices) { console.log('find', devices, err); });
// usbDetect.find(vid, pid, function(err, devices) { console.log('find', devices, err); });
// Promise version of `find`:
// usbDetect.find().then(function(devices) { console.log(devices); }).catch(function(err) { console.log(err); });