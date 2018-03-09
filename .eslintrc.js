module.exports = {
  root: true,
  extends: 'airbnb',
  rules: {
    strict: 0,

    'spaced-comment': ['error', 'always', { markers: ['#'] }],

    'lines-around-comment': ['error', {
      ignorePattern: '(# comment|env bash)',
      beforeLineComment: true,
      allowBlockStart: true,
      allowObjectStart: true,
      allowArrayStart: true,
    }],

    'comma-dangle': [
      'error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'function-paren-newline': 0,
    'no-plusplus': 'off',
    'no-console': 'off',
  },
  globals: {
    Ext: true,
    log: true,
  },
  env: {
    node: true,
    es6: true,
    commonjs: true,
  },
};
