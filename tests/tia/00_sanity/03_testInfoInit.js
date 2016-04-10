l.println('Freshly inited test info, empty title, verbose:');
l.println(gIn.tInfo.testInfoToString(gIn.tInfo.data, false, true, false, false));

t.setTitle('Test for testInfo init');

l.println('Freshly inited test info, real title, verbose:');
l.println(gIn.tInfo.testInfoToString(gIn.tInfo.data, false, true, false, false));

l.eol();

l.println('Freshly inited test info, no time, no title, short:');
l.println(gIn.tInfo.testInfoToString(gIn.tInfo.data, false, false, true, true));

l.println('This test does not touch pass and fail counters, so validity determined only with absense of diff');
