const escpos = require('escpos');

const vid = process.argv[2];
const pid = process.argv[3];
const device  = new escpos.USB(vid, pid);
const options = { encoding: 'GB18030'};
const printer = new escpos.Printer(device, options);

device.open(() => {
  printer
  .font('a')
  .align('ct')
  .style('bu')
  .size(1, 1)
  .text('The quick brown fox jumps over the lazy dog')
  .text('敏捷的棕色狐狸跳过懒狗')
  .barcode('1234567', 'EAN8')
  .qrimage('https://github.com/song940/node-escpos', (err) => {
    printer.cut();
    printer.close();
  });
});