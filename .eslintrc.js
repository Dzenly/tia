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
    'no-restricted-syntax': 0,
    'no-plusplus': 'off',
    'no-console': 'off',

    'max-params': ['error', 4],
    'max-len': [2, 112, 2, {
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    'no-await-in-loop': 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'consistent-return': 'off',
    'no-continue': 'off',
    'no-mixed-operators': 'off',
    'no-underscore-dangle': 'off',
  },
  globals: {
    Ext: true,
    log: true,
    gT: true,
    gT_: true,
    gIn: true,
  },
  env: {
    node: true,
    es6: true,
    commonjs: true,
  },
};
