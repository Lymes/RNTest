module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
       'module-resolver',
       {
         root: ['.'],
         extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
         alias: {
           tests: ['./tests/'],
           assets: ['./assets'],
           "~components": "./src/components",
           "~navigation": "./src/navigation",
           "~i18n": "./src/i18n"
         }
       }
    ]
  ]
};
