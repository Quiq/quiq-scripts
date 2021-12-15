const path = require('path');
const moduleVisitor = require('eslint-module-utils/moduleVisitor').default;

const containsPath = (filepath, target) => {
  const relative = path.relative(target, filepath);
  return relative === '' || !relative.startsWith('..');
};

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      url: '',
    },

    schema: [
      {
        type: 'object',
        properties: {
          snippets: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'object',
              properties: {
                code: {type: 'string'},
                directories: {
                  type: 'array',
                  minItems: 1,
                  items: {
                    type: 'string',
                  },
                },
                message: {type: 'string'},
              },
              additionalProperties: false,
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create: function preventJavaScriptSnippets(context) {
    const options = context.options[0] || {};
    const snippets = options.snippets || [];
    const basePath = options.basePath || process.cwd();
    const currentFilename = context.getPhysicalFilename
      ? context.getPhysicalFilename()
      : context.getFilename();

    for (let snippet of snippets) {
      let directories = snippet.directories || [];

      if (directories.length > 0) {
        let resolvedDirectories = directories.map((dir) => path.resolve(basePath, dir));
        let checkFileForCode = resolvedDirectories.some(
          (dir) => currentFilename.indexOf(dir) !== -1,
        );

        if (checkFileForCode) {
          const sourceCode = context.getSourceCode();
          const lines = sourceCode.lines;
          const comments = sourceCode.getAllComments();
          const linesToIgnore = [];

          // Ignore all comments
          for (let comment of comments) {
            for (let i = comment.loc.start.line; i <= comment.loc.end.line; i++) {
              linesToIgnore.push(i);
            }
          }

          for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            let lineNumber = i + 1;

            if (linesToIgnore.indexOf(lineNumber) === -1) {
              let indexOfSnippetCode = line.indexOf(snippet.code);

              if (indexOfSnippetCode !== -1) {
                let message = `[Line ${lineNumber}, Column ${indexOfSnippetCode}] ${snippet.message}.`;

                context.report({
                  loc: {
                    start: {
                      line: lineNumber,
                      column: indexOfSnippetCode,
                    },
                    end: {
                      line: lineNumber,
                      column: indexOfSnippetCode + snippet.code.length,
                    },
                  },
                  message: message,
                  data: {
                    currentFilename: currentFilename,
                    codeSnippet: snippet.code,
                    line: line,
                    lineNumber: lineNumber,
                  },
                });
              }
            }
          }
        }
      }
    }

    return {commonjs: true};
  },
};
