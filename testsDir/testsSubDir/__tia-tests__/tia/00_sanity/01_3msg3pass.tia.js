const { t, a, l } = gT;

t.setTitle('2 messages and 3 passes.');

l.println('Message 1 of 2');
l.println('Message 2 of 2');

l.println('Two passes without messages...');

l.pass();
l.pass();

l.pass('Pass with message');
