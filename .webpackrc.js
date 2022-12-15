const path = require("path");
export default {
  extraBabelPlugins: [
    ["import", { libraryName: "antd", libraryDirectory: "es", style: true }],
  ],
  theme: {
    "@primary-color": "#1371fa",
  },
  proxy: {
    "/api": {
      target: "http://localhost:6050",
      changeOrigin: true,
    },
  },
  env: {
    development: {
      extraBabelPlugins: ["dva-hmr"],
      publicPath: "/",
    },
    production: {
      publicPath: "/",
    },
  },

  es5ImcompatibleVersions: true,
  alias: {
    Utilities: path.resolve(__dirname, "utilities/"),
    Translations: path.resolve(__dirname, "translations/"),
    Assets: path.resolve(__dirname, "assets/"),
  },
  hash: true,
  html: {
    template: "./src/index.ejs",
  },
};
