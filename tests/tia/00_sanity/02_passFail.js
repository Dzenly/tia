t.setTitle('Check for pass and fail work');

l.fail();
a.equal(ll.getFailed(), 1, 'Here must be 1 failed test');

l.fail('fail with message\n');
a.equal(ll.getFailed(), 2, 'Here must be 2 failed tests');

l.pass();
l.pass('pass with message\n');

a.equal(ll.getPassed(), 4, 'Here must be 4 passed tests');

l.print('Freshly inited test info, real title, verbose:\n');
l.print(gIn.tInfo.testInfoToString(gIn.tInfo.data, false, true, false, false));

ll.setFailed(0);
a.equal(ll.getFailed(), 0, 'After setFailed Here must be 0 failed tests');

ll.setPassed(1);
a.equal(ll.getPassed(), 1, 'After setPassed Here must be 1 passed test');
