const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const glob = require("glob");
const postcssPresetEnv = require("postcss-preset-env");

const PATHS = {
  src: path.join(__dirname),
};

module.exports = {
  entry: {
    index: "./index.html",
    team: "./team/index.html",
    recruiting: "./recruiting-3/index.html",
    jobs: "./jobs/index.html",
    datenschutz: "./datenschutz/index.html",
    404: "./404/index.html",
    marketing: "./marketing-2/index.html",
    projekte: "./projekte/index.html",
    balklobback: "./projekte/balklobback/index.html",
    "ettmeier-kampagne-rot": "./projekte/ettmeier-kampagne-rot/index.html",
    "nopa-rebranding": "./projekte/nopa-rebranding/index.html",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js", // Example filename pattern
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      //   {
      //     test: /\.css$/,
      //     use: [
      //       MiniCssExtractPlugin.loader,
      //       "css-loader",
      //       "postcss-loader", // Optional for autoprefixer etc.
      //     ],
      //   },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [postcssPresetEnv(/* pluginOptions */)],
                // plugins: [
                //   [
                //     "postcss-preset-env",
                //     {
                //       // Options
                //     },
                //   ],
                // ],
              },
            },
          },
        ],
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "./**/*.html", to: "[path][name].[ext]" }],
    }),
    new HtmlWebpackPlugin({
      template: "./index.html", // Your HTML template
      filename: "./index.html", // Output filename
    }),
    new MiniCssExtractPlugin({
      filename: "styles.min.css",
    }),
    new CssMinimizerPlugin(),
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        format: {
          comments: false,
        },
      },
    }),
    // new PurgecssPlugin({
    //   paths: {
    //     styles: ["./src/**/*.html"], // Update with your HTML paths
    //     scripts: ["./src/**/*.js"], // Update with your JS paths
    //   },
    //   whitelist: ["*"], // Update with whitelist patterns if needed
    // }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
  ],
  // Add your optimization options here (optional)
};
