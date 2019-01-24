const { t, a } = gT;

t.setTitle('Root dir: Checking global config.');

a.value(gT.globalConfig.dummyOptionForTests, 'dummyOptionForTests', 'dummyOptionForTests');
a.value(gT.globalConfig.rootDirAlias, '-=TIA=-', 'rootDirAlias');
a.value(gT.globalConfig.nonExistingOption, undefined, 'nonExistingOption');
