const path = require('path');
const moduleVisitor = require('eslint-module-utils/moduleVisitor').default;

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
          libraries: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'string',
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create: function preventWholeLibraryImports(context) {
    const options = context.options[0] || {};
    const restrictedLibraries = options.libraries || [];
    const sourceCode = context.getSourceCode();

    function checkForRestrictedImportPath(importPath, node) {
      // (1) Remove '../' and './' from path
      // (2) Remove preceding '/'
      let modifiedImportPath = importPath.replace(/\.\.\//g, '').replace(/\.\//g, '');

      if (modifiedImportPath.indexOf('/') === 0) {
        modifiedImportPath = modifiedImportPath.substring(1);
      }

      if (Array.isArray(restrictedLibraries) && restrictedLibraries.length > 0) {
        restrictedLibraries.forEach((library, index) => {
          const isResctrictedLibrary =
            modifiedImportPath.toLowerCase().indexOf(library.toLowerCase()) === 0;

          const isImportingWholeLibrary =
            modifiedImportPath.toLowerCase() === library.toLowerCase();

          if (isResctrictedLibrary && isImportingWholeLibrary) {
            const importCode = sourceCode.getText(node.parent);
            const isTypeImport = importCode.toLowerCase().indexOf('import type') === 0;

            // Ignoring 'import type from library' since that is not an issue when it
            // comes to the build size.
            if (!isTypeImport) {
              context.report({
                node: node,
                message: `The full library for '{{importPath}}' is not allowed to be imported. Import only the required dependency(s) from the library (ex: import method from '{{importPath}}/requiredMethod').`,
                data: {importPath},
              });
            }
          }
        });
      }
    }

    return moduleVisitor(
      (source) => {
        checkForRestrictedImportPath(source.value, source);
      },
      {commonjs: true},
    );
  },
};
