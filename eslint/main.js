module.exports = {
  rules: {
    'prevent-whole-library-imports': require('./prevent-whole-library-imports'),
    'prevent-cross-app-imports': require('./prevent-cross-app-imports'),
    'prevent-javascript-snippets': require('./prevent-javascript-snippets'),
    'emotion-avoid-untrusted-content': require('./emotion-avoid-untrusted-content'),
  },
};
