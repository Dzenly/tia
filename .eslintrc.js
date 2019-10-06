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
      excludedFiles: ['**/browser-part/**/*.js'],
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
      },
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
        '**/browser-part/**/*.js',
      ],
      parserOptions: {
        ecmaVersion: 5,
        sourceType: 'script',
      },
      rules: {
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
            max: 2,
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
            newIsCap: true,
            capIsNew: true,
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
        quotes: [
          2,
          'single',
        ],
        semi: [
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
            anonymous: 'always',
            named: 'never',
          },
        ],
        'keyword-spacing': [
          2,
          {
            before: true,
            after: true,
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
        curly: [
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
        yoda: [
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
            builtinGlobals: true,
          },
        ],
        'no-with': [
          2,
        ],
        eqeqeq: [
          2,
        ],
        'no-unneeded-ternary': [
          2,
        ],
        'space-unary-ops': [
          2,
          {
            words: true,
            nonwords: false,
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
            boolean: true,
            number: true,
            string: true,
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
        camelcase: 0,
        'object-curly-spacing': 0,
        'array-element-newline': [
          'error',
          {
            multiline: true,
            minItems: 2,
          },
        ],
        'comma-dangle': [
          'error',
          {
            arrays: 'always-multiline',
            objects: 'always-multiline',
          },
        ],
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
        browser: true,
        node: false,
        // es6: true,
        jest: false,
      },
    },
    {
      files: [
        '*.ts',
      ],
      excludedFiles: [
        '*.js',
      ],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: path.join(__dirname, 'tsconfig.json'),
        sourceType: 'module',
        ecmaVersion: 2018,
      },
      plugins: [
        '@typescript-eslint',
        'prettier',
      ],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/member-ordering': 1,
        '@typescript-eslint/require-await': 0,
        '@typescript-eslint/no-empty-interface': 0,
        'sort-keys': 0,
        'prettier/prettier': ['error'],
        '@typescript-eslint/no-non-null-assertion': 0,
        'require-atomic-updates': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/ban-ts-ignore': 0,
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
