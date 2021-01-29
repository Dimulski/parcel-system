const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const nodeExternals = require("webpack-node-externals");

exports.chainWebpack = (webpackConfig) => {
  if (!process.env.SSR) return;

  webpackConfig.target("node");
  webpackConfig.output.libraryTarget("commonjs2");

  webpackConfig
    .plugin("manifest")
    .use(new WebpackManifestPlugin({ filename: "ssr-manifest" }));

  webpackConfig.externals(
    nodeExternals({
      allowlist: /\.(css|vue)$/,
    })
  );

  webpackConfig.optimization.splitChunks(false).minimize(false);

  webpackConfig.plugins.delete("hmr");
  webpackConfig.plugins.delete("preload");
  webpackConfig.plugins.delete("prefetch");
  webpackConfig.plugins.delete("progress");
  webpackConfig.plugins.delete("friendly-errors");

  // console.log(webpackConfig.toConfig);
};
