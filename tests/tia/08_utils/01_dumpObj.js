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
  },
  m: function() {
    return function() {
      return 27;
    }
  },
  n : function() {
    return null;
  },
  o: null,
  p: {
    a: 5,
    b: 6
  }
};

function testExistingArr(propPaths) {
  var arr = [];
  gT.commonMiscUtils.dumpObj(obj, propPaths, arr, true);
  l.println(arr.join('\n'));
}

function testNewArr(propPaths) {
  var arr = gT.commonMiscUtils.dumpObj(obj, propPaths, null, true);
  l.println(arr.join('\n'));
}

function testNewArrSafe(propPaths) {
  var arr = gT.commonMiscUtils.dumpObj(obj, propPaths, null);
  l.println(arr.join('\n'));
}

l.println('Separatedly: ');

testExistingArr(['a.b']);

testNewArrSafe(['nnnn.mmmm', 'a.nnn.mmm', 'a.nnn()', 'g().a', 'g().a.b']);

testExistingArr([{path: 'l().fun1()().a', args: [[3, 4, 5], [6, 7], [8, 9]]}]);

testExistingArr(['a.c.d']);
testExistingArr(['g()']);
testNewArrSafe(['f.h.j().i']);

l.sep();
l.println('Together: ');

testNewArr([
  'a.b', 'a.c.d', 'g()', 'f.h.j().i', {path: 'k()', args: [[1, 2, 3]]},
  {path: 'l().fun()', args: [[3, 4, 5], [6, 7]]},
  {path: 'l().fun1()()', args: [[3, 4, 5], [6, 7], [8, 9]]},
  'm()()', 'n()', 'o', 'p'
  ]);

testNewArrSafe(['aaa', 'bbb.ccc', 'a.asdf()']);

a.exception(()=>testExistingArr(['www()']), "TypeError: Cannot read property 'apply' of undefined; Path: www()");
a.exception(()=>testExistingArr(['www.ggg']), "TypeError: Cannot read property 'ggg' of undefined; Path: www.");
a.exception(()=>testExistingArr(['a.b.v()']), "TypeError: Cannot read property 'apply' of undefined; Path: a.b.v()");
a.exception(()=>testExistingArr(['a()']), "TypeError: propPathVal.apply is not a function; Path: a()");
a.exception(()=>testExistingArr(['g()()']), "TypeError: propPathVal.apply is not a function; Path: g()()");
a.exception(()=>testExistingArr([{path: 'l().fun2()', args: [[3, 4, 5], [6, 7]]}]),
  "TypeError: Cannot read property 'apply' of undefined; Path: l(3,4,5).fun2(6,7)");
a.exception(()=>testExistingArr([{path: 'l().fun1()().a.b', args: [[3, 4, 5], [6, 7], [8, 9]]}]),
   "TypeError: Cannot read property 'b' of undefined; Path: l(3,4,5).fun1(6,7)(8,9).a.");
