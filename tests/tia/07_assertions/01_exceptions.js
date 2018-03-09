'use strict';

t.setTitle('Tests for "exception" assertion');

let tableName = 'My Exception';

l.println('Any exception');
a.exception(
  function () {
    throw new Error(tableName);
  }
);

l.println('Certain exception');
a.exception(
  function () {
    throw new Error(tableName);
  },
  'Error: ' + tableName
);

l.println('Unexpected exception');
a.exception(
  function () {
    throw new Error(tableName);
  },
  'Error: ' + 'Another exception'
);

l.println('Not any exception');
a.exception(
  function () {
    return 5;
  }
);

l.println('Not a certain exception');
a.exception(
  function () {
    return 5;
  },
  'Some Expected Exception'
);
