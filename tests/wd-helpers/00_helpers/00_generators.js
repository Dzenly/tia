function *generator1() {
	t.setTitle('Test for generator runner');
	l.println(yield gT.s.promise.delayed(2000));
	l.println(yield gT.s.promise.delayed(2000));
	l.println(yield gT.s.promise.fulfilled("Success"));
	l.println(yield gT.s.promise.rejected("Reason"));
	l.println(yield gT.s.promise.delayed(2000));
}

u.execGen(generator1);

