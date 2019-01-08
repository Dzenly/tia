const { t, l, s } = gT;

function* generator1(a, b, c, d) {
  t.setTitle('Test for generator runner, auto exec call');
  l.println(`a: ${a}, b: ${b}, c: ${c}, d: ${d}`);
  l.println(yield gT.u.promise.delayed(500, 'value1'));
  l.println(yield gT.u.promise.delayed(500, 'value2'));
  l.println(yield Promise.resolve('Success'));
  l.println(yield Promise.reject('Intentionaly rejected promise'));
  l.println('This string should not be in log');
  l.println(yield gT.u.promise.delayed(2000, 'This string should not be in log'));
  yield 'Test done';
}

module.exports = u.execGenSafe(generator1, 'a', 'b', 'c', 'd');
