module.exports = function* generator1() {
  t.setTitle('Test for generator runner');
  l.println(yield gT.u.promise.delayed(500, 'value1'));
  l.println(yield gT.u.promise.delayed(500, 'value2'));
  l.println(yield Promise.resolve('Success'));
  l.println(yield Bluebird.reject('Intentionaly rejected promise'));
  l.println('This string should not be in log');
  l.println(yield gT.u.promise.delayed(2000, 'This string should not be in log'));
  yield 'Test done';
};
