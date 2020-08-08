const path = require("path"); //подключаем path для превращения относительного пути в абсолютный
const HtmlWebpackPlugin = require("html-webpack-plugin"); // плагин html
// подключим mini-css-extract-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  //указываем начальную точку
  entry: { main: "./src/pages/index.js" },
  //указываем в какой файл будет собираться весь js и дали ему имя
  output: {
    //точка входа с использованием утилиты path
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        loader: "babel-loader",
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: "/node_modules/",
        query: {
          plugins: ["transform-class-properties"],
        },
      },
      // добавили правило для обработки файлов
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff|woff2)$/,
        // при обработке этих файлов нужно использовать file-loader
        loader: "file-loader",
      },
      // аналогично добавьте правило для работы с html
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            // добавим объект options, чтоб работали @import'ы
            options: { importLoaders: 1 },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // путь к файлу index.html
    }),
    new MiniCssExtractPlugin(), // подключение плагина для объединения файлов
  ],
};
