module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  plugins: [
    'prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'no-underscore-dangle':'off',
    'class-methods-use-this':'off',
    'no-param-reassign':'off',
    'func-names':'off',
    'camelcase':'off',
    'no-unused-vars': ['error', {'argsIgnorePattern':'next'}],
  },
};
