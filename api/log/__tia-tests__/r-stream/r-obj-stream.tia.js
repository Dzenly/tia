'use strict';

const { Readable } = require('stream');

module.exports = async function test() {
  t.setTitle('Test for readable stream to test log.');
  const rObjStream = new Readable({ objectMode: true, read: () => {} });
  gT.logUtils.rStreamToLog(rObjStream);
  rObjStream.push('String 1');
  rObjStream.push({ a: 'a', b: 'b' });
  rObjStream.push('String 2');
  rObjStream.push(null);
  await gT.u.promise.delayed(10);
  rObjStream.push('After end, should issue error');
  await gT.u.promise.delayed(10);
};
