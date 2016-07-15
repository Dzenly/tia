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
  },
  k: function(a, b, c) {
    return a + b + c;
  },
  l: function(a, b, c) {
    return {
      fun: function(param1, param2) {
        return a + b + c + param1 + param2;
      },
      fun1: function(param1, param2) {
        return function(param3, param4) {
          return a + b + c + param1 + param2 + param3 + param4;
        }
      }
    }
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

test([
  'a.b', 'a.c.d', 'g()', 'f.h.j().i', {path: 'k()', args: [[1, 2, 3]]},
  {path: 'l().fun()', args: [[3, 4, 5], [6, 7]]},
  {path: 'l().fun1()()', args: [[3, 4, 5], [6, 7], [8, 9]]}

  ]);
