t.setTitle('Checking that all global variables are exist and correct.');

a.true(typeof gT !== 'undefined', 'gT exists');
a.true(typeof gIn !== 'undefined', 'gIn exists');
a.true('config' in gIn, 'gIn.config exists');
a.true('tInfo' in gIn, 'gIn.tInfo exists');
a.true('data' in gIn.tInfo, 'gIn.tInfo.data exists');

