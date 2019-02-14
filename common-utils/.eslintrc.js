module.exports = {
  'root': true,
  'settings': {
    'ecmascript': 5,
  },
  'rules': {
    'linebreak-style': [
      2,
      'unix',
    ],
    'eol-last': [
      2,
    ],
    'no-trailing-spaces': [
      2,
    ],
    'no-mixed-spaces-and-tabs': [
      2,
    ],
    'no-multiple-empty-lines': [
      2,
      {
        'max': 2,
      },
    ],
    'max-len': [
      2,
      120,
      2,
    ],
    'new-cap': [
      2,
      {
        'newIsCap': true,
        'capIsNew': true,
      },
    ],
    'new-parens': [
      2,
    ],
    'one-var': [
      2,
      'never',
    ],
    'no-shadow': [
      2,
    ],
    'array-bracket-spacing': [
      2,
      'never',
    ],
    'key-spacing': [
      2,
    ],
    'quotes': [
      2,
      'single',
    ],
    'semi': [
      2,
      'always',
    ],
    'no-extra-semi': [
      2,
    ],
    'semi-spacing': [
      2,
    ],
    'comma-style': [
      2,
      'last',
    ],
    'no-spaced-func': [
      2,
    ],
    'space-before-function-paren': [
      2,
      {
        'anonymous': 'always',
        'named': 'never',
      },
    ],
    'keyword-spacing': [
      2,
      {
        'before': true,
        'after': true,
      },
    ],
    'space-in-parens': [
      2,
      'never',
    ],
    'no-multi-spaces': [
      2,
    ],
    'operator-linebreak': [
      2,
      'after',
    ],
    'curly': [
      2,
    ],
    'brace-style': [
      2,
    ],
    'space-before-blocks': [
      2,
      'always',
    ],
    'no-cond-assign': [
      2,
    ],
    'yoda': [
      2,
      'never',
    ],
    'no-duplicate-case': [
      2,
    ],
    'no-unreachable': [
      2,
    ],
    'no-redeclare': [
      2,
      {
        'builtinGlobals': true,
      },
    ],
    'no-with': [
      2,
    ],
    'eqeqeq': [
      2,
    ],
    'no-unneeded-ternary': [
      2,
    ],
    'space-unary-ops': [
      2,
      {
        'words': true,
        'nonwords': false,
      },
    ],
    'no-eval': [
      2,
    ],
    'no-throw-literal': [
      2,
    ],
    'valid-typeof': [
      2,
    ],
    'no-implicit-coercion': [
      2,
      {
        'boolean': true,
        'number': true,
        'string': true,
      },
    ],
    'no-multi-str': [
      2,
    ],
    'spaced-comment': [
      2,
      'always',
    ],
    'vars-on-top': 0,
    'no-inner-declarations': 0,
    'camelcase': 0,
    'object-curly-spacing': 0,
    'array-element-newline': [
      'error',
      {
        'multiline': true,
        'minItems': 2,
      },
    ],
    'comma-dangle': [
      'error',
      {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
      },
    ],
  },
  'globals': {
    'Ext': true,
    'R': true,
    'Glyphs': true,
    'Common': true,
    'DB': true,
    'log': true,
    'io': true,
    'sails': true,
    'Settings': true,
    'window': true,
    'RV': true,
    'Locales': true,
    'UTIL': true,
    'SMTP': true,
    'RM': true,
    'MAIL': true,
    'LDAP': true,
    'IM': true,
    'CRON': true,
    'CM': true,
    'AM': true,
    'moment': true,
    'Document': true,
    'Regexps': true,
  },
};
