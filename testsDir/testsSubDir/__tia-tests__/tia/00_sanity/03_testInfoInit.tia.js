l.println('Freshly inited test info, empty title, verbose:');
l.println(gIn.tInfo.testInfoToString({
  curInfo: gIn.tInfo.data,
  isDir: false,
  verbose: true,
  noTime: false,
  noTitle: false
}));

t.setTitle('Test for testInfo init');

l.println('Freshly inited test info, real title, verbose:');
l.println(gIn.tInfo.testInfoToString({
  curInfo: gIn.tInfo.data,
  isDir: false,
  verbose: true,
  noTime: false,
  noTitle: false
}));

l.eol();

l.println('Freshly inited test info, no time, no title, short:');
l.println(gIn.tInfo.testInfoToString({
  curInfo: gIn.tInfo.data,
  isDir: false,
  verbose: false,
  noTime: true,
  noTitle: true
}));

l.println('This test does not touch pass and fail counters, so validity determined only with absense of dif');
