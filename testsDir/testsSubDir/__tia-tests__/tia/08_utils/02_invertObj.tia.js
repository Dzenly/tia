'use strict';

const { t, a, l } = gT;

t.setTitle('Tests for invertObj function');

const uniqueObj = {
  key1: 'value1',
  key2: 'value2',
};

const notUniqueObj = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value2',
  key4: 'value3',
};

l.println('\nUnique values: ');
const invertedUniqueObjs = gT.commonMiscUtils.invertMapObj(uniqueObj);
l.println(JSON.stringify(invertedUniqueObjs, null, 2));

l.println('Non unique values: ');
const invertedNotUniqueObjs = gT.commonMiscUtils.invertMapObj(notUniqueObj);
l.println(JSON.stringify(invertedNotUniqueObjs, null, 2));
