t.setTitle('Checking that all global variables are exist and correct.');

a.true(typeof gT !== 'undefined', 'gT exists');
a.true('config' in gT, 'gT.config exists');
a.true('tInfo' in gT, 'gT.tInfo exists');
a.true('data' in gT.tInfo, 'gT.tInfo.data exists');
