// Learn more: https://docs.expo.dev/guides/customizing-metro/
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// `input` points to the global stylesheet that holds the Tailwind directives.
module.exports = withNativeWind(config, { input: './src/global.css' });
