'use strict';

t.setTitle('Tests for dump function');

var obj = {
  a: {
    b: 'a.b',
    c: {
      d: 'a.c.d'
    }
  },
  f: {
    h: {
      j: function() {
        return {
          i : 'f.h.j().i'
        };
      }
    }
  },
  g: function() {
    return 'g()';
  }
};

function test(propPaths) {
  var arr = [];
  gIn.commonMiscUtils.dumpObj(obj, propPaths, arr);
  l.println(arr.join('\n'));
}

l.println('Separatedly: ');

test(['a.b']);
test(['a.c.d']);
test(['g()']);
test(['f.h.j().i']);

l.sep();
l.println('Together: ');

test(['a.b', 'a.c.d', 'g()', 'f.h.j().i']);
