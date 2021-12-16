module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', '@quiq'],
  ignorePatterns: ['dist/*', 'temp_docker/*', '.*.js', 'babel.config.js'],
  rules: {
    // Errors
    'no-return-assign': ['error'],
    'react/jsx-no-duplicate-props': ['error'],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],

    // Warnings
    'prefer-rest-params': ['warn'],
    'react/jsx-uses-react': ['warn'],
    'react/jsx-uses-vars': ['warn'],
    'react/no-did-update-set-state': ['warn'],
    'react/no-did-mount-set-state': ['warn'],
    'react/no-string-refs': ['warn'],
    'react/no-array-index-key': ['warn'],
  },
};
