module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/no-var-requires': 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/member-delimiter-style": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "space-before-function-paren": 0,
    "no-unneeded-ternary": "off",
    "generator-star-spacing": "off",
    "no-mixed-operators": 0,
    "indent": "off",
    "no-unused-vars": "off",
    "no-undef": 0,
    "vue/return-in-computed-property": "off"
  }
}
