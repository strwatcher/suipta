module.exports = {
  env: {
    node: true,
  },

  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],

  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    camelcase: 'error',
    eqeqeq: 'error',
    'prefer-const': 'error',
  },

  parser: '@typescript-eslint/parser',
  root: true,

  ignorePatterns: ['!.*', 'node_modules'],
}
