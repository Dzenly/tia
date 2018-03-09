'use strict';

t.setTitle('Tests for equalDeep assertion');

let number1 = 5;
let number2 = 5;
let number3 = 4;

let string1 = 'a';
let string2 = 'a';
let string3 = 'b';

let objNoSubObj1 = {
  a: 3,
  b: 'Some string',
  c: true,
  d: null,
  e: void(0)
};

let objNoSubObj2 = {
  a: 3,
  b: 'Some string',
  c: true,
  d: null,
  e: void(0)
};

let objNoSubObj3 = {
  a: 4,
  b: 'Some string',
  c: true,
  d: null,
  e: void(0)
};

let obj1 = {
  a: 3,
  b: 'Some string',
  c: true,
  d: null,
  e: void(0),
  sub: {
    f: 1,
    g: 'Some string 1',
    sub1: {
      h: 5
    }
  }
};

let obj2 = {
  a: 3,
  b: 'Some string',
  c: true,
  d: null,
  e: void(0),
  sub: {
    f: 1,
    g: 'Some string 1',
    sub1: {
      h: 5
    }
  }
};

let obj3 = {
  a: 3,
  b: 'Some string',
  c: true,
  d: null,
  e: void(0),
  sub: {
    f: 1,
    g: 'Some string 1',
    sub1: {
      h: 6
    }
  }
};

let res;

function checkGood(act, exp, msg) {
  res = a.valueDeep(act, exp, msg);
  a.true(res, msg);
}

function checkBad(act, exp, msg) {
  res = a.valueDeep(act, exp, msg);
  a.false(res, msg);
}

l.println('Good cases');

checkGood(number1, number2, 'Numbers');
checkGood(string1, string2, 'Strings');
checkGood(objNoSubObj1, objNoSubObj2, 'Object with no sub object');
checkGood(obj1, obj2, 'Object with sub object');

l.sep();
l.println('Bad cases');

checkBad(null, void(0), 'null, undefined');
checkBad(void(0), null, 'undefined, null');
checkBad(null, {}, 'null, object');
checkBad({}, null, 'object, null');
checkBad({}, 'asdf', 'object, string');
checkBad('asdf', {}, 'string, object');
checkBad({}, 3, 'object, number');
checkBad(3, {}, 'number, object');

checkBad(3, 'asdf', 'number, string');
checkBad('asdf', 3, 'string, number');

checkBad(number1, number3, 'Numbers');
checkBad(string1, string3, 'Strings');
checkBad(objNoSubObj1, objNoSubObj3, 'Object with no sub object');
checkBad(obj1, obj3, 'Object with sub object');

checkBad({a: 5}, {b: 5}, 'Different properties');
checkBad({a: 5}, {}, 'Different property count');

checkBad({a: {}}, {a: null}, 'Different property types: object, null');

checkBad({a: 3}, {a: 'asdf'}, 'Different property types: number, string');

a.equal(1, 1, 'val1', 'val2');
a.equal(1, 2, 'val1', 'val2');

a.equalBool(1, 1, 'val1', 'val2');
a.equalBool(1, 2, 'val1', 'val2');  // pass
a.equalBool(0, 2, 'val1', 'val2');  // fail

a.notEqualBool(1, 1, 'val1', 'val2');
a.notEqualBool(1, 2, 'val1', 'val2'); // fail
a.notEqualBool(true, false, 'val1', 'val2'); // pass

a.equalBool(1, 1, 'val1', 'val2', true);  // pass
a.equalBool(1, 2, 'val1', 'val2', true);  // pass
a.equalBool(0, 2, 'val1', 'val2', true);  // fail

a.notEqualBool(1, 1, 'val1', 'val2', true); // fail
a.notEqualBool(1, 2, 'val1', 'val2', true); // fail
a.notEqualBool(true, false, 'val1', 'val2', true); // pass
