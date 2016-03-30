var path = require('path');

gTE.configUtils = {};

gTE.configUtils.copyConfig = function (config) {
  var result = {};
  for (var prop in config) {
    result[prop] = config[prop];
  }
  return result;
};

/**
 * Returns a new config which is merge config1 and config2.
 * Properties from config2 override properties from config1.
 * Does not change config1 and config2.
 * @param config1
 * @param config2
 */
gTE.configUtils.mergeConfigs = function (config1, config2) {
  var result = gTE.configUtils.copyConfig(config1);
  for (var prop in config2) {
    result[prop] = config2[prop];
  }
  return result;
};

// Returns merged config for suite.
gTE.configUtils.handleSuiteConfig = function () {
  var curSuiteConfig = {};
  var configPath = path.join(gTE.params.suiteRoot, gTE.engineConfig.suiteConfigName);
  var code;
  try {
    code = fs.readFileSync(configPath);
    curSuiteConfig = vm.runInThisContext(code);
  } catch (e) {
  }
  gTE.suiteConfig = gTE.configUtils.mergeConfigs(gTE.suiteConfigDefault, curSuiteConfig);
};
