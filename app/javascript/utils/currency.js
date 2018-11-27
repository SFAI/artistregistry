export const convertToCurrency = (inputPrice) => {
  let value = new String(inputPrice);
  // remove all characters that aren't a digit or dot
  value = value.replace(/[^0-9.]/g,'');
  // replace multiple dots with a single dot
  value = value.replace(/\.+/g,'.');
  // only allow 2 digits after a dot
  value = value.replace(/(.*\.[0-9][0-9]?).*/g,'$1');
  // replace multiple zeros with a single one
  value = value.replace(/^0+(.*)$/,'0$1');
  // remove leading zero
  value = value.replace(/^0([^.].*)$/,'$1');
  return value;
}
