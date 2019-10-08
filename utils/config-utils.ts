import * as _ from 'lodash';
import * as nodeUtils from '../utils/nodejs-utils';

// Returns merged config for suite.
export function handleSuiteConfig() {
  let localSuiteConfig = {};

  // TODO: current suite dir.
  try {
    localSuiteConfig = nodeUtils.requireEx(gIn.suite.configPath, true).result;
  } catch (e) {
    gIn.tracer.msg2(e);
    gIn.tracer.msg2(`There is no Suite Config: ${gIn.suite.configPath}`);
  }
  gT.suiteConfig = _.merge(_.cloneDeep(gT.rootSuiteConfig), localSuiteConfig);
}
