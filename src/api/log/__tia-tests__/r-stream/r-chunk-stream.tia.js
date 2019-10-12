'use strict';

const { t, l, s } = gT;

const { Readable } = require('stream');

module.exports = async function test() {
  t.setTitle('Test for readable stream to test log.');
  const rObjStream = new Readable({ objectMode: false, read: () => {} });
  gT.logUtils.rStreamToLog(rObjStream);
  rObjStream.push('String 1');
  await gT.u.promise.delayed(10);
  rObjStream.push({ a: 'a', b: 'b' });
  await gT.u.promise.delayed(10);
  rObjStream.push('String 2');
  rObjStream.push(null);
  await gT.u.promise.delayed(10);
  rObjStream.push('After end, should issue error');
  await gT.u.promise.delayed(10);
};
