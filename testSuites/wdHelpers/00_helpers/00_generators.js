function *generator1() {
	t.setTitle('Test for generator runner');
	t.println(yield gTE.sel.promise.delayed(2000));
	t.println(yield gTE.sel.promise.delayed(2000));
	t.println(yield gTE.sel.promise.fulfilled("Success"));
	t.println(yield gTE.sel.promise.rejected("Reason"));
	t.println(yield gTE.sel.promise.delayed(2000));
}

sel.execGen(generator1);

