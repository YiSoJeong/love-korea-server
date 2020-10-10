module.exports = {
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  rules: {
    'linebreak-style': 0,
    'prettier/prettier': 0,
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
  env: {
    es6: true,
  },
};
