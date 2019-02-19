module.exports = api => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          modules: false,
          targets: {
            browsers: ['Chrome >= 50', 'Edge >= 12', 'FF >= 45', 'Safari >= 9', 'IE >= 11'],
          },
        },
      ],
      '@babel/preset-react',
      '@babel/preset-flow',
    ],
    plugins: [
      'react-hot-loader/babel',
      'emotion',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-syntax-import-meta',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-json-strings',
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      '@babel/plugin-proposal-function-sent',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-numeric-separator',
      '@babel/plugin-proposal-throw-expressions',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-logical-assignment-operators',
      '@babel/plugin-proposal-optional-chaining',
      [
        '@babel/plugin-proposal-pipeline-operator',
        {
          proposal: 'minimal',
        },
      ],
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-do-expressions',
      '@babel/plugin-proposal-function-bind',
    ],
    env: {
      test: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: [
          'emotion',
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-syntax-import-meta',
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-json-strings',
          [
            '@babel/plugin-proposal-decorators',
            {
              legacy: true,
            },
          ],
          '@babel/plugin-proposal-function-sent',
          '@babel/plugin-proposal-export-namespace-from',
          '@babel/plugin-proposal-numeric-separator',
          '@babel/plugin-proposal-throw-expressions',
          '@babel/plugin-proposal-export-default-from',
          '@babel/plugin-proposal-logical-assignment-operators',
          '@babel/plugin-proposal-optional-chaining',
          [
            '@babel/plugin-proposal-pipeline-operator',
            {
              proposal: 'minimal',
            },
          ],
          '@babel/plugin-proposal-nullish-coalescing-operator',
          '@babel/plugin-proposal-do-expressions',
          '@babel/plugin-proposal-function-bind',
        ],
      },
      development: {
        plugins: [
          [
            'emotion',
            {
              sourceMap: true,
            },
          ],
          'react-hot-loader/babel',
        ],
      },
    },
  };
};