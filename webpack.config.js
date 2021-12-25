const path = require('path'); //node.jsにデフォルトで入っているpathモジュールを使用
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development', //デフォルト: production, 開発環境ではdevelopment
  devtool: 'source-map', //jsソースマップの出力
    entry: './src/scripts/main.js',
    output: {
        path: path.resolve(__dirname, './dist'), //path.resolveで絶対パスを取得、第一引数(__dirname)が現在の階層を表す
        filename: 'scripts/main.js', // 出力されるファイル名
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader', //typescriptの読み込み
            },
          ],
        },
        {
          test: /\.js/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', {'targets': '> 0.25%, not dead'}], //公式のサポートが終了しておらず、0.25%以上のシェアがあるブラウザを対象とする。
                  '@babel/preset-react',
                ],
              },
            },
          ],
        },
        {
            test: /\.(css|scss|sass)$/, //.cssを検知する
            use: [
                {
                  loader: MiniCssExtractPlugin.loader, //loaderは下から上に適用されるので、css-loader, MiniCssExtractPlugin.loaderの順になる。
                },
                {
                  loader: 'css-loader', //.cssが見つかれば、このルールを適用する。
                  options: {
                    sourceMap: true,
                  }
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sassOptions: {
                      outputStyle: 'expanded',
                    },
                  },
                },
            ],
        },
        {
            test: /\.(png|jpg|jpeg)/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        name: 'images/[name].[ext]', //[name].[ext]で元のファイル名と拡張子のまま出力する
                        publicPath: '/',
                    }
                },
                {
                  loader: 'image-webpack-loader',
                  options: {
                    mozjpeg: {
                      progressive: true,
                      quality: 65,
                    }
                  }
                },
            ],
        },
        {
            test: /\.pug/,
            use: [
                {
                    loader: 'html-loader',
                },
                {
                    loader: 'pug-html-loader',
                    options: {
                        pretty: true,
                    }
                },
            ]
        },
      ],
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: './styles/main.css', //出力後のcssファイル名を指定
        }),
        new HtmlWebpackPlugin({
          template: './src/templates/index.pug',
          filename: 'index.html',
        }),
        new HtmlWebpackPlugin({
          template: './src/templates/access.pug', //htmlをビルドする場合はindex.html
          filename: 'access.html',
        }),
        new HtmlWebpackPlugin({
          template: './src/templates/members/taro.pug', //htmlをビルドする場合はindex.html
          filename: 'members/taro.html',
        }),
        new CleanWebpackPlugin(),
    ],
}
