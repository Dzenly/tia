'use strict';

t.setTitle('Tests for dumpObj function');

let obj = {
  a: {
    b: 'a.b',
    c: {
      d: 'a.c.d'
    },
    fun: function () {
      return this.b;
    }
  },
  f: {
    h: {
      j: function () {
        return {
          i: 'f.h.j().i'
        };
      }
    }
  },
  g: function () {
    return 'g()';
  },
  k: function (a, b, c) {
    return a + b + c;
  },
  l: function (a, b, c) {
    return {
      fun: function (param1, param2) {
        return a + b + c + param1 + param2;
      },
      fun1: function (param1, param2) {
        return function (param3, param4) {
          return a + b + c + param1 + param2 + param3 + param4;
        }
      },
      thisVal: 5,
      fun3: function () {
        return this.thisVal;
      }
    }
  },
  m: function () {
    return function () {
      return 27;
    }
  },
  n: function () {
    return null;
  },
  o: null,
  p: {
    a: 5,
    b: 6
  }
};

let eMode = gT.commonMiscUtils.dumpObjErrMode;

function testExistingArrException(propPaths) {
  let arr = [];
  gT.commonMiscUtils.dumpObj(obj, propPaths, arr, eMode.exception);
  if (arr.length) {
    l.println(arr.join('\n'));
  }
}

function testNewArrException(propPaths) {
  let arr = gT.commonMiscUtils.dumpObj(obj, propPaths, null, eMode.exception);
  if (arr.length) {
    l.println(arr.join('\n'));
  }
}

function testNewArrNA(propPaths) {
  let arr = gT.commonMiscUtils.dumpObj(obj, propPaths, null, eMode.showNA);
  if (arr.length) {
    l.println(arr.join('\n'));
  }
}

function testNewArrNADef(propPaths) {
  let arr = gT.commonMiscUtils.dumpObj(obj, propPaths);
  if (arr.length) {
    l.println(arr.join('\n'));
  }
}

function testNewArrOmitStr(propPaths) {
  let arr = gT.commonMiscUtils.dumpObj(obj, propPaths, null, eMode.omitString);
  if (arr.length) {
    l.println(arr.join('\n'));
  }
}

function testNewArrOmitStrIfUndefined(propPaths) {
  let arr = gT.commonMiscUtils.dumpObj(obj, propPaths, null, eMode.omitStringIfUndefined);
  if (arr.length) {
    l.println(arr.join('\n'));
  }
}

l.println('Separatedly: ');

testNewArrOmitStrIfUndefined(['nnnn.mmmm', 'a.nnn.mmm', 'a.nnn()', 'g().a', 'g().a.b']);

testExistingArrException(['a.b']);

testExistingArrException(['l().fun3()', 'a.fun()']);

testNewArrNADef(['nnnn.mmmm', 'a.nnn.mmm', 'a.nnn()', 'g().a', 'g().a.b']);

testNewArrNA(['nnnn.mmmm', 'a.nnn.mmm', 'a.nnn()', 'g().a', 'g().a.b']);

testNewArrOmitStr(['nnnn.mmmm', 'a.nnn.mmm', 'a.nnn()', 'g().a', 'g().a.b']);

testExistingArrException([{path: 'l().fun1()().a', args: [[3, 4, 5], [6, 7], [8, 9]]}]);

testExistingArrException(['a.c.d']);
testExistingArrException(['g()']);
testNewArrNADef(['f.h.j().i']);

l.sep();
l.println('Together: ');

testNewArrException([
  'a.b', 'a.c.d', 'g()', 'f.h.j().i', {path: 'k()', args: [[1, 2, 3]]},
  {path: 'l().fun()', args: [[3, 4, 5], [6, 7]]},
  {path: 'l().fun1()()', args: [[3, 4, 5], [6, 7], [8, 9]]},
  'm()()', 'n()', 'o', 'p'
]);

testNewArrNADef(['aaa', 'bbb.ccc', 'a.asdf()']);

l.println(gT.commonMiscUtils.dumpObj(void(0), ['aaa']).join('\n'));
l.println(gT.commonMiscUtils.dumpObj(null, ['aaa']).join('\n'));
l.println(gT.commonMiscUtils.dumpObj({}, ['aaa']).join('\n'));


a.exception(()=>testExistingArrException(['www()']), "TypeError: Cannot read property 'apply' of undefined; Path: www()");
a.exception(()=>testExistingArrException(['www.ggg']), "TypeError: Cannot read property 'ggg' of undefined; Path: www.");
a.exception(()=>testExistingArrException(['a.b.v()']), "TypeError: Cannot read property 'apply' of undefined; Path: a.b.v()");
a.exception(()=>testExistingArrException(['a()']), "TypeError: propPathVal.apply is not a function; Path: a()");
a.exception(()=>testExistingArrException(['g()()']), "TypeError: propPathVal.apply is not a function; Path: g()()");
a.exception(()=>testExistingArrException([{path: 'l().fun2()', args: [[3, 4, 5], [6, 7]]}]),
  "TypeError: Cannot read property 'apply' of undefined; Path: l(3,4,5).fun2(6,7)");
a.exception(()=>testExistingArrException([{path: 'l().fun1()().a.b', args: [[3, 4, 5], [6, 7], [8, 9]]}]),
  "TypeError: Cannot read property 'b' of undefined; Path: l(3,4,5).fun1(6,7)(8,9).a.");

a.exception(()=>gT.commonMiscUtils.dumpObj(void(0), ['aaa'], null, true),
  "TypeError: Cannot read property 'aaa' of undefined; Path: ");
a.exception(()=>gT.commonMiscUtils.dumpObj(null, ['aaa'], null, true),
  "TypeError: Cannot read property 'aaa' of null; Path: ");

a.exception(()=>gT.commonMiscUtils.dumpObj('asdf', ['aaa.bbb'], null, true),
  "TypeError: Cannot read property 'bbb' of undefined; Path: aaa.");
