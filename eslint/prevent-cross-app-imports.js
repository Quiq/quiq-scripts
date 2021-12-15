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
          zones: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'object',
              properties: {
                target: {type: 'string'},
                from: {type: 'string'},
                except: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  uniqueItems: true,
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

  create: function preventCrossAppImports(context) {
    const options = context.options[0] || {};
    const restrictedPaths = options.zones || [];
    const basePath = options.basePath || process.cwd();
    const currentFilename = context.getPhysicalFilename
      ? context.getPhysicalFilename()
      : context.getFilename();

    const currentRestrictedZones = restrictedPaths.filter((zone) => {
      const targetPath = path.resolve(basePath, zone.target);
      return containsPath(currentFilename, targetPath);
    });

    function checkForRestrictedImportPath(importPath, node) {
      // (1) Remove '../' and './' from path
      // (2) Remove preceding '/'
      let modifiedImportPath = importPath.replace(/\.\.\//g, '').replace(/\.\//g, '');

      if (modifiedImportPath.indexOf('/') === 0) {
        modifiedImportPath = modifiedImportPath.substring(1);
      }

      // Look at each currently restricted zone and see if it matches the current import path.
      currentRestrictedZones.forEach((zone, index) => {
        const isExcludedImport = modifiedImportPath.indexOf(zone.from) === 0;

        if (isExcludedImport) {
          const message = `${zone.message} ('{{importPath}}').`;

          context.report({
            node: node,
            message: message,
            data: {importPath},
          });
        }
      });
    }

    return moduleVisitor(
      (source) => {
        checkForRestrictedImportPath(source.value, source);
      },
      {commonjs: true},
    );
  },
};
