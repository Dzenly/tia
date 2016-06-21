'use strict';

t.setTitle('Tests for "exception" assertion');

var msg = 'My Exception';

l.println('Any exception');
a.exception(
  function () {
    throw new Error(msg);
  }
);

l.println('Certain exception');
a.exception(
  function () {
    throw new Error(msg);
  },
  'Error: ' + msg
);

l.println('Unexpected exception');
a.exception(
  function () {
    throw new Error(msg);
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
