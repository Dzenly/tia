t.print('Freshly inited test info, empty title, verbose:\n');
t.print(gTE.tinfo.testInfoToString(gTE.tinfo.data, false, true, false, false));

t.setTitle('Test for testInfo init');

t.print('Freshly inited test info, real title, verbose:\n');
t.print(gTE.tinfo.testInfoToString(gTE.tinfo.data, false, true, false, false));

t.eol();

t.print('Freshly inited test info, no time, no title, short:\n');
t.print(gTE.tinfo.testInfoToString(gTE.tinfo.data, false, false, true, true));

t.print('This test does not touch pass and fail counters, so validity determined only with absense of diff\n');
