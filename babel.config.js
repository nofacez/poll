module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', {
    targets: {
      esmodules: true,
    },
  }],
  plugins: ['@babel/transform-runtime'],
};
