module.exports = api => {
  api.cache(true);

  return {
    sourceMaps: false,
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "usage",
          corejs: 3,
          loose: true,
          modules: false,
          targets: {
            browsers: ["Chrome >= 50", "Edge >= 12", "FF >= 45", "Safari >= 9"]
          }
        }
      ],
      "@babel/preset-react",
      "@babel/preset-flow",
      "@babel/preset-typescript"
    ],
    plugins: [
      "react-hot-loader/babel",
      ["emotion", {autoLabel: true}],
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-syntax-import-meta",
      "@babel/plugin-proposal-json-strings",
      [
        "@babel/plugin-proposal-decorators",
        {
          legacy: true
        }
      ],
      ["@babel/plugin-proposal-class-properties", {loose: true}],
      "@babel/plugin-proposal-function-sent",
      "@babel/plugin-proposal-export-namespace-from",
      "@babel/plugin-proposal-numeric-separator",
      "@babel/plugin-proposal-throw-expressions",
      "@babel/plugin-proposal-export-default-from",
      "@babel/plugin-proposal-logical-assignment-operators",
      "@babel/plugin-proposal-optional-chaining",
      [
        "@babel/plugin-proposal-pipeline-operator",
        {
          proposal: "minimal"
        }
      ],
      "@babel/plugin-proposal-nullish-coalescing-operator",
      "@babel/plugin-proposal-do-expressions",
      "@babel/plugin-proposal-function-bind"
    ],
    env: {
      test: {
        presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
        plugins: [
          ["emotion", {autoLabel: true}],
          "@babel/plugin-syntax-dynamic-import",
          "@babel/plugin-syntax-import-meta",
          "@babel/plugin-proposal-json-strings",
          [
            "@babel/plugin-proposal-decorators",
            {
              legacy: true
            }
          ],
          ["@babel/plugin-proposal-class-properties", {loose: true}],
          "@babel/plugin-proposal-function-sent",
          "@babel/plugin-proposal-export-namespace-from",
          "@babel/plugin-proposal-numeric-separator",
          "@babel/plugin-proposal-throw-expressions",
          "@babel/plugin-proposal-export-default-from",
          "@babel/plugin-proposal-logical-assignment-operators",
          "@babel/plugin-proposal-optional-chaining",
          [
            "@babel/plugin-proposal-pipeline-operator",
            {
              proposal: "minimal"
            }
          ],
          "@babel/plugin-proposal-nullish-coalescing-operator",
          "@babel/plugin-proposal-do-expressions",
          "@babel/plugin-proposal-function-bind"
        ]
      },
      development: {
        plugins: [
          [
            "emotion",
            {
              sourceMap: true,
              autoLabel: true
            }
          ],
          "react-hot-loader/babel"
        ]
      },
      production: {
        plugins: [
          [
            "emotion",
            {
              sourceMap: false,
              autoLabel: true
            }
          ]
        ]
      }
    }
  };
};
