'use strict';

const tiaExtJsQuery = require('../../common-misc-utils');

const {t, a, l} = gT;

const inputStr = `
mix-sd\\.f_123 [inside-square] #after-hash[asdf123="fdas2_0df"] [inside-square=is-val]after-square:fda&reference
,after-comma
}after-curly
]after-square
)after-brace&reference
:after-colon
#after-hash
after-new-line
 after-space
>after-more
#after-hash
a:after-colon
a#after-hash
a after-space
a>after-more
a#after-hash
`;

module.exports = async function test() {
  t.setTitle('Replace xtypes in TEQ string');

  const outputStr = tiaExtJsQuery.replaceXTypesInTeq(inputStr);

  l.print(outputStr);
};
