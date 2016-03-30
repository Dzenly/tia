t.setTitle('Checking that all global variables are exist and correct.');

t.checkTrue(typeof gT !== 'undefined', 'gT exists');
t.checkTrue('config' in gT, 'gT.config exists');
t.checkTrue('tinfo' in gT, 'gT.tinfo exists');
t.checkTrue('data' in gT.tinfo, 'gT.tinfo.data exists');


