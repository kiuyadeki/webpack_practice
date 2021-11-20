const path = require('path'); //node.jsにデフォルトで入っているpathモジュールを使用
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'), //path.resolveで絶対パスを取得、第一引数(__dirname)が現在の階層を表す
        filename: 'main.js', // 出力されるファイル名
    },
    module: {
        rules: [
            {
                test: /\.css/, //.cssを検知する
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader, //loaderは下から上に適用されるので、css-loader, MiniCssExtractPlugin.loaderの順になる。
                    },
                    {
                        loader: 'css-loader' //.cssが見つかれば、このルールを適用する。
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
}
