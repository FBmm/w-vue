module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    "no-console": 0,
    "vue/max-attributes-per-line": 0,
    "vue/singleline-html-element-content-newline": 0,
    "vue/attributes-order": 0,
    "vue/no-unused-vars": 0,
    "no-unused-vars": 0,
  }
}
