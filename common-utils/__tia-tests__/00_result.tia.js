'use strict';

const { result } = require('../../build/common-utils/common-misc-utils');
const { t, l } = gT;

const obj = {
  a: {
    b: {
      c() {
        return 'a.b.c func result';
      }
    }
  },
  d: [
    'd[0]',
    'd[1]'
  ],
  e: 'e',
};

t.setTitle('result() from common-misc-utils.js');

l.println(result(obj, 'a.b.c'));
l.println(result(obj, 'd.0'));
l.println(result(obj, 'e'));
l.println(result(obj, 'e.f', 'default for e.f'));
l.println(result(obj, 'g.f', 'default for g.f'));





