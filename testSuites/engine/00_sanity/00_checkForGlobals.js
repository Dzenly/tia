t.setTitle('Checking that all global variables are exist and correct.');

t.check(typeof gTE !== 'undefined', 'gTE exists');
t.check('config' in gTE, 'gTE.config exists');
t.check('tinfo' in gTE, 'gTE.tinfo exists');
t.check('data' in gTE.tinfo, 'gTE.tinfo.data exists');


