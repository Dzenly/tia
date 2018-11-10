function *generator1(a, b, c, d) {
	t.setTitle('Test for generator runner, auto exec call');
  l.println(`a: ${a}, b: ${b}, c: ${c}, d: ${d}`);
  l.println(yield Bluebird.delay(500, 'value1'));
  l.println(yield Bluebird.delay(500, 'value2'));
	l.println(yield Bluebird.resolve("Success"));
	l.println(yield Bluebird.reject("Intentionaly rejected promise"));
	l.println('This string should not be in log');
	l.println(yield Bluebird.delay(2000, 'This string should not be in log'));
  yield 'Test done';
}

module.exports = u.execGenSafe(generator1, 'a', 'b', 'c', 'd');

