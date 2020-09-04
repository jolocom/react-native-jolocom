/**
 * Metro configuration for React Native, to polyfill some required libraries
 */

module.exports = {
  resolver: {
    extraNodeModules: {
      // React Native bindings for jolocom/wallet-rs
      crypto: require.resolve('react-native-crypto'),
      // Polyfills for node packages
      'crypto-browserify': require.resolve('react-native-crypto'),
      stream: require.resolve('stream-browserify'),
      vm: require.resolve('vm-browserify'),
    },
  },
}
