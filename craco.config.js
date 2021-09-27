const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@layout-body-background": "#E5E5E5",
              "@primary-color": "#1E2144",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

// modifyVars color variable guide
//https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
