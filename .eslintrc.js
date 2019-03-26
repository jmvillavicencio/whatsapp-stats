module.exports = {
  extends: 'airbnb-base',
  settings: {
    'import/resolver': {
      'babel-module': {
      },
    },
  },
  env: {
    node: true,
    browser: false,
  },
  rules: {
    'prefer-destructuring': [0],
    'import/no-extraneous-dependencies': [0],
    'no-console': 'off',
    'new-cap': ['error', { capIsNewExceptions: ['express.Router'] }],
    'no-use-before-define': ['error', { functions: false, classes: true }],
    'arrow-body-style': 'off',
    'no-param-reassign': ["error", { "ignorePropertyModificationsFor": ["responses"] }],
    'max-len': ["error", {
      "code": 200,
      "ignoreUrls": true,
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true,
      "ignoreRegExpLiterals": true,
    }],
    'new-cap': ["error", {  "capIsNew": false, "newIsCapExceptions": ["crawler", "j2xParser"] }]
  },
};
