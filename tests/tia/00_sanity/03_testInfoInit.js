l.print('Freshly inited test info, empty title, verbose:\n');
l.print(gT.tInfo.testInfoToString(gT.tInfo.data, false, true, false, false));

t.setTitle('Test for testInfo init');

l.print('Freshly inited test info, real title, verbose:\n');
l.print(gT.tInfo.testInfoToString(gT.tInfo.data, false, true, false, false));

l.eol();

l.print('Freshly inited test info, no time, no title, short:\n');
l.print(gT.tInfo.testInfoToString(gT.tInfo.data, false, false, true, true));

l.print('This test does not touch pass and fail counters, so validity determined only with absense of diff\n');
