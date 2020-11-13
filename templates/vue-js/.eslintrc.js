module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    es6: true,
    node: true
  },

  plugins: ['vue'],
  extends: [
    'plugin:vue/essential',
    'plugin:vue/recommended',
    'eslint:recommended',
    '@vue/standard'
  ]
}
