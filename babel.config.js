module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
       {
         root: ['.'],
         extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
         alias: {
           tests: ['./tests/'],
           assets: ['./assets'],
           "~contexts": ["./src/contexts"],
           "~routes": ["./src/routes"],
           "~screens": ["./src/screens"],
           "~services": ["./src/services"],
           "~hooks": ["./src/hooks"],     
           "~components": "./src/components",
           "~navigation": "./src/navigation",
           "~i18n": "./src/i18n"
         }
       },
    ]
  ]
};
