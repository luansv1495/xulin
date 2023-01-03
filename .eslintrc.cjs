/* eslint-disable @typescript-eslint/naming-convention */
// eslint-disable-next-line no-undef
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  root: true,
  rules: {
    'prettier/prettier': 2,
    '@typescript-eslint/ban-types': 2,
    '@typescript-eslint/explicit-function-return-type': 2,
    '@typescript-eslint/member-ordering': [
      2,
      { default: ['field', 'constructor', 'method', 'signature'] }
    ],
    '@typescript-eslint/naming-convention': [
      2,
      {
        selector: ['parameter', 'property', 'function'],
        format: ['camelCase'],
        leadingUnderscore: 'allow'
      },
      {
        selector: ['interface'],
        format: ['PascalCase'],
        leadingUnderscore: 'allow'
      }
    ],
    '@typescript-eslint/no-empty-interface': 2,
    '@typescript-eslint/no-require-imports': 2,
    //"@typescript-eslint/no-unnecessary-condition": 2
    '@typescript-eslint/no-unnecessary-type-constraint': 2,
    //'@typescript-eslint/no-unsafe-return': 2
    '@typescript-eslint/no-useless-empty-export': 2,
    '@typescript-eslint/parameter-properties': [
      2,
      {
        allow: ['private']
      }
    ],
    '@typescript-eslint/prefer-enum-initializers': 2,
    //'@typescript-eslint/prefer-includes': 2
    '@typescript-eslint/prefer-literal-enum-member': 2,
    //'@typescript-eslint/prefer-regexp-exec': 2
    //'@typescript-eslint/prefer-string-starts-ends-with': 2
    '@typescript-eslint/prefer-ts-expect-error': 2,
    //'@typescript-eslint/restrict-plus-operands': 2
    '@typescript-eslint/sort-type-constituents': 2,
    //'@typescript-eslint/switch-exhaustiveness-check': 2
    '@typescript-eslint/typedef': [
      2,
      {
        arrowParameter: true
        //variableDeclaration: true
      }
    ]
  }
};
