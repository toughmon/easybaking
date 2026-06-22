module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // jsxImportSource: 'nativewind' enables the `className` prop on RN components.
      // babel-preset-expo also reads app.json `experiments.reactCompiler` and wires
      // the React Compiler automatically — keep this preset to preserve that behavior.
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
  };
};
