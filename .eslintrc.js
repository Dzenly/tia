module.exports = {
  root: true,
  extends: 'airbnb',
  rules: {
    strict: 0,

    ['lines-around-comment']: [
      'error', {
        beforeLineComment: true,
        allowBlockStart: true,
        allowObjectStart: true,
        allowArrayStart: true,
      },
    ],

    ['comma-dangle']: [
      'error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'function-paren-newline': 0,
    ['no-plusplus']: 'off',
  },
  globals: {
    Ext: true,
    log: true,
  },
  env: {
    node: true,
    es6: true,
    commonjs: true,
  }
}
