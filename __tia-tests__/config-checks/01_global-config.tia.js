t.setTitle('Root dir: Checking global config.');

gT.a.value(gT.globalConfig.dummyOptionForTests, 'dummyOptionForTests', 'dummyOptionForTests');
gT.a.value(gT.globalConfig.rootDirAlias, '-=TIA=-', 'rootDirAlias');
gT.a.value(gT.globalConfig.nonExistingOption, undefined, 'nonExistingOption');
