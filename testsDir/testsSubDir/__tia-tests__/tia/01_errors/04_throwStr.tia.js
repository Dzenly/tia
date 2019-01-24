const { t, a, l } = gT;

t.setTitle('Test throws "SomeErr" string');

throw('SomeErr');

// TODO: also this test generates message to stderr.
