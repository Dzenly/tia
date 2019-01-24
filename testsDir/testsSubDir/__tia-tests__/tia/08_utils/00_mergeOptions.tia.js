'use strict';

const { t, a, l } = gT;

t.setTitle('Tests for mergeOptions function');

let src = {
  a: {
    b: 4,
    c: {
      d: 3
    }
  },
  f: {}
};

function def() {
  return {
    a: {
      b: 1,
      c: {
        d: 2,
        e: 3
      }
    },
    f: {
      g: 1
    }
  };
}

let dst1 = {
  a: {
    b: 4,
    c: {
      d: 3,
      e: 3
    }
  },
  f: {
    g: 1
  }
};

let dst = gT.commonMiscUtils.mergeOptions(src, def);
a.valueDeep(dst, dst1, 'Src with non default values');

dst = gT.commonMiscUtils.mergeOptions({}, def);
a.valueDeep(dst, def(), 'Empty src');

a.exception(
  function () {
    gT.commonMiscUtils.mergeOptions({a: null}, def);
  },
  'TypeError: Cannot convert undefined or null to object'
);
