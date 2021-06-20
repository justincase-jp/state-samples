module.exports = function (api) {
  api.cache(true);
  const presets = [
    '@babel/preset-env',
    '@babel/preset-typescript',
    '@babel/preset-react',
  ];
  const parserOpts = {
    // It's required for tsx/jsx to be processed by stylelint.
    // https://github.com/stylelint/stylelint/issues/4732
    "plugins": ["jsx", "typescript"],
  };
  const plugins = [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ["@babel/plugin-proposal-private-methods", { loose: true }],
  ];
  return {
    presets,
    parserOpts,
    plugins,
  };
}
