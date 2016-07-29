t.setTitle('Check for pass and fail work');

l.fail();
a.value(ll.getFailed(), 1, 'Failed tests count');

l.fail('Expected fail with message.');
a.value(ll.getFailed(), 2, 'Failed tests count');

l.pass();
l.pass('Pass with message\n');

a.value(ll.getPassed(), 4, 'Passed tests count');

l.println('There will be equal without message');
a.value(5, 5);

a.value(ll.getPassed(), 6, 'Passed tests count');

l.println('Freshly inited test info, real title, verbose:');
l.println(gIn.tInfo.testInfoToString(gIn.tInfo.data, false, true, false, false));

ll.setFailed(0);
a.value(ll.getFailed(), 0, 'After setFailed(0), failed tests count');

ll.setPassed(1);
a.value(ll.getPassed(), 1, 'After setPassed(1), passed test count');
