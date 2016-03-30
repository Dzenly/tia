t.setTitle('Checking that all global variables are exist and correct.');

t.checkTrue(typeof gTE !== 'undefined', 'gTE exists');
t.checkTrue('config' in gTE, 'gTE.config exists');
t.checkTrue('tinfo' in gTE, 'gTE.tinfo exists');
t.checkTrue('data' in gTE.tinfo, 'gTE.tinfo.data exists');


