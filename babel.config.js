module.exports = {
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/proposal-class-properties'],
    ['@babel/transform-runtime'],
    [
      'babel-plugin-root-import',
      {
        rootPathSuffix: '.',
      },
    ],
  ],
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
};
