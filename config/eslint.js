module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', '@quiq'],
  ignorePatterns: ['dist/*', 'temp_docker/*', '.*.js', 'babel.config.js'],
  rules: {
    '@quiq/prevent-cross-app-imports': [
      'error',
      {
        zones: [
          // Core UI
          {
            target: 'core-ui/',
            from: 'core-agent-ui/',
            message: 'Cannot import code from core-agent-ui into core-ui',
          },
          {
            target: 'core-ui/',
            from: 'admin-ui/',
            message: 'Cannot import code from admin-ui into core-ui',
          },
          {
            target: 'core-ui/',
            from: 'message-ui/',
            message: 'Cannot import code from message-ui into core-ui',
          },
          {
            target: 'core-ui/',
            from: 'outbound-ui/',
            message: 'Cannot import code from outbound-ui into core-ui',
          },
          {
            target: 'core-ui/',
            from: 'chat-ui/',
            message: 'Cannot import code from chat-ui into core-ui',
          },
        ],
      },
    ],

    '@quiq/prevent-javascript-snippets': [
      'error',
      {
        snippets: [
          {
            code: 'var brianTest = true;',
            directories: ['./'],
            message: "Cannot use 'var brianTest = true;' within any code.",
          },
        ],
      },
    ],

    'no-return-assign': 2,
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
      {
        selector: 'CallExpression[callee.name="encodeURIComponent"]',
        message:
          'Params for API calls are URI encoded in ApiMiddleware. Calling this twice will mess up the URI encoding.',
      },
    ],
  },
};
