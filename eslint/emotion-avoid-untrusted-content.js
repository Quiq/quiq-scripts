"use strict";

module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Prevents setting the CSS content property dynamically inside styled component string",
    },
  },

  create: function emotionAvoidUntrustedContent(context) {
    const searchString = "content:";
    const warning = `Avoid setting CSS property "content" to an untrusted dynamic value. If this is a trusted value you can ignore this error.`

    return {
      TemplateLiteral(node) {
        const {expressions, quasis} = node;
        const q = quasis.find(q => q.value.raw.includes(searchString));
        if (!q) return;
        const lines = q.value.raw.split('\n');
        const i = lines.findIndex(l => l.includes(searchString));
        if (i < 0) return;
        const lineNo = q.loc.start.line + i;
        const e = expressions.find(exp => exp.loc.start.line === lineNo);
        if (e) {
          context.report({
            message: warning,
            node: e
          });
        }
      }
    };
  }
};