/**
 * Metro configuration for React Native, to polyfill some required libraries
 */

module.exports = {
  resolver: {
    extraNodeModules: {
      crypto: require.resolve('react-native-crypto'),
      'crypto-browserify': require.resolve('react-native-crypto'),
      stream: require.resolve('stream-browserify'),
      vm: require.resolve('vm-browserify'),
    },
  },
}
