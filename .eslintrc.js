const path = require('path');

module.exports = {
  root: true,
  overrides: [
    {
      extends: [
        'airbnb-base',
      ],
      files: [
        '*.js',
      ],
      rules: {
        strict: 0,

        'spaced-comment': ['error', 'always', { markers: ['#'] }],

        'lines-around-comment': [
          'error',
          {
            ignorePattern: '(# comment|env bash)',
            beforeLineComment: true,
            allowBlockStart: true,
            allowObjectStart: true,
            allowArrayStart: true,
          },
        ],
        'comma-dangle': [
          'error',
          {
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

        'implicit-arrow-linebreak': 0,
        'import/no-unresolved': 0,
      },
      globals: {
        gT: true,
        gT_: true,
        gIn: true,
        gIn_: true,
        Ext: true,
        R: true,
      },
      env: {
        browser: false,
        node: true,
        es6: true,
        jest: false,
      },
    },
    {
      files: [
        '*.ts',
      ],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
        'prettier/@typescript-eslint',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: path.join(__dirname, 'tsconfig.json'),
      },
      plugins: [
        '@typescript-eslint',
      ],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/member-ordering': 1,
        '@typescript-eslint/require-await': 0,
        'sort-keys': 1,
      },
      globals: {
        gT: true,
        gT_: true,
        gIn: true,
        gIn_: true,
        Ext: true,
        R: true,
      },
      env: {
        browser: false,
        node: true,
        es6: true,
        jest: false,
      },
    },
  ],
};
