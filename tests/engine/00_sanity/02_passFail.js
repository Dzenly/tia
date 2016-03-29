t.setTitle('Check for pass and fail work');

t.fail();
t.checkNumber(t.getFailed(), 1, 'Here must be 1 failed test');

t.fail('fail with message\n');
t.checkNumber(t.getFailed(), 2, 'Here must be 2 failed tests');

t.pass();
t.pass('pass with message\n');

t.checkNumber(t.getPassed(), 4, 'Here must be 4 passed tests');

t.print('Freshly inited test info, real title, verbose:\n');
t.print(gTE.tinfo.testInfoToString(gTE.tinfo.data, false, true, false, false));

t.setFailed(0);
t.checkNumber(t.getFailed(), 0, 'After setFailed Here must be 0 failed tests');

t.setPassed(1);
t.checkNumber(t.getPassed(), 1, 'After setPassed Here must be 1 passed test');