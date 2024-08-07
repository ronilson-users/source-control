const { exec } = require('child_process');
const path = require('path');

module.exports = (env, options) => {
  const { mode = 'development' } = options;
  const rules = [
    {
      test: /\.m?js$/,
      use: [
        'html-tag-js/jsx/tag-loader.js',
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      ],
    },
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        'style-loader', // Adiciona os estilos ao DOM via tag <style>
        'css-loader', // Interpreta @import e url() como import/require()
        'postcss-loader', // Adiciona prefixos automaticamente
        'sass-loader', // Compila arquivos .scss para .css
      ],
    },
  ];

  const main = {
    mode,
    entry: {
      main: './src/main.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
    module: {
      rules,
    },
    plugins: [
      {
        apply: (compiler) => {
          compiler.hooks.afterDone.tap('pack-zip', () => {
            // run pack-zip.js
            exec('node .vscode/pack-zip.js', (err, stdout, stderr) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log(stdout);
            });
          });
        },
      },
    ],
  };

  return [main];
};