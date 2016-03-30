function *generator1() {
	t.setTitle('Test for generator runner');
	t.println(yield gT.sel.promise.delayed(2000));
	t.println(yield gT.sel.promise.delayed(2000));
	t.println(yield gT.sel.promise.fulfilled("Success"));
	t.println(yield gT.sel.promise.rejected("Reason"));
	t.println(yield gT.sel.promise.delayed(2000));
}

sel.execGen(generator1);

