## 0.15 - 1.x.y

# There are changes to make TIA a bit closer to Jest.

* Now the engine is received the root tests directory
and searches for all `__tests__` subdirectories in the root directory. 

* Before there were `--tests-dir` and `TIA_TESTS_DIR`,
 now there `--root-dir` and `TIA_ROOT_DIR`.

* Now each project can contain many ```__tests__``` directories,
and these directories called "test suites".
Each such directory can contain ```suite-config.js```.

* A new term 'suite log', previously 'meta log', it is digest for all tests in suite.

* A new term 'root dir log', it is digest for all tests in root dir.

* Each `__tests__` directory contains `__tia__` directory.
It keeps suite log (in various formats), etalon suite log, info about resources usage.

* Before path to metalog was specified by --et-mlog cmd line option.
Now for `someDir/__tests__` the suite ethalon log is expected to be in `someDir/__tia__/suite.et`.
And for test root dir the ethalon log is expected to be in `<root>/__tia__/project.et`.

* Browser profiles now are keeped in `__tia__tests/__tia__/browser-profiles`.
Before they where in <parent of --tests-dir>/br-profiles.

* New option `--test-suffix` allows to run specific files only.
Like Jest requires `.jest.js` or `spec.js`, you can use `--test-suffix .tia.js` to filter
only `*.tia.js` files from `__tests__` subdirectories.
