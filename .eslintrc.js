module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'arrow-parens': [
      'error',
      'as-needed',
    ],
    'semi': 'error',
    'prefer-destructuring': 'error',
    'max-len': [
      'warn',
      {
        'code': 150,
        'ignoreUrls': true,
        'ignorePattern': 'import',
      },
    ],
    'no-unused-vars': 'warn',
    'operator-linebreak': 'warn',
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    // 'react/tsx-closing-tag-location': 2,
    // 'react/tsx-closing-bracket-location': 'off',
    // 'react/tsx-max-props-per-line': [
    //   2,
    //   {
    //     'maximum': 2,
    //     'when': 'always',
    //   },
    // ],
    // 'react/tsx-filename-extension': [
    //   2,
    //   {
    //     'extensions': [
    //       '.tsx',
    //     ],
    //   },
    // ],
    // 'tsx-quotes': [
    //   'error',
    //   'prefer-single',
    // ],
    'comma-dangle': [
      2,
      'always-multiline',
    ],
    'prefer-const': [
      'error',
      {
        'destructuring': 'any',
        'ignoreReadBeforeAssign': false,
      },
    ],
    'react/prop-types': 'off',
  },
};