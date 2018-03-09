'use strict';

let fs = require('fs');

t.setTitle('Test for external log');

fs.writeFileSync(gIn.params.extLog, 'This string must be in test log\n', gT.engineConsts.logEncoding);
