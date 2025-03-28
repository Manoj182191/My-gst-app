const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // Enable CSS support for web
  isCSSEnabled: true,
});

// Reduce the maximum number of files Metro will watch
config.watchFolders = [__dirname];
config.resolver.nodeModulesPaths = [__dirname + '/node_modules'];

// Optimize transformer configuration
config.transformer = {
  ...config.transformer,
  minifierPath: 'metro-minify-terser',
  minifierConfig: {
    // Reduce memory usage during transformation
    compress: {
      reduce_vars: true,
      inline: 1,
    },
    mangle: {
      toplevel: false,
    },
  },
};

module.exports = config;