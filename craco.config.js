const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@layout-body-background': '#f0f2f5'
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