t.setTitle('Check for pass and fail work');

l.fail();
a.value(lL.getFailed(), 1, 'Failed tests count');

l.fail('Expected fail with message.');
a.value(lL.getFailed(), 2, 'Failed tests count');

l.pass();
l.pass('Pass with message\n');

a.value(lL.getPassed(), 4, 'Passed tests count');

l.println('There will be equal without message');
a.value(5, 5);

a.value(lL.getPassed(), 6, 'Passed tests count');

l.println('Freshly inited test info, real title, verbose:');
l.println(gIn.tInfo.testInfoToString(gIn.tInfo.data, false, true, false, false));

lL.setFailed(0);
a.value(lL.getFailed(), 0, 'After setFailed(0), failed tests count');

lL.setPassed(1);
a.value(lL.getPassed(), 1, 'After setPassed(1), passed test count');
