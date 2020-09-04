# react-native-jolocom

[Jolocom SDK](https://github.com/jolocom/jolocom-sdk) integration with React
Native.

## Getting started

### Install

You need to install two packages, the `@jolocom/native-core-react-native`
package contains the actual binding code and is generated from
https://github.com/jolocom/rust-multi-target/tree/master/react-native

```sh
$ yarn add react-native-jolocom @jolocom/native-core-react-native
```

OR

```sh
$ npm install --save react-native-jolocom @jolocom/native-core-react-native
```

### Mostly automatic installation

For React Native version >= 0.60, Android is automatic, but for iOS you need to do:
```sh
$ cd ios
$ pod install
```

For React Native version < 0.60 you need to link
```
$ react-native link react-native-jolocom @jolocom/native-core-react-native
```

### Configure Metro

Some of the dependency require libraries from node and must be polyfilled.
You will need to add this `resolver.extraNodeModules` config to your
`metro.config.js`

```js
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
```

And of course you need to add those as dependency in your project:
```sh
$ yarn add react-native-crypto stream-browserify vm-browserify
```

### Configure SDK storage

The SDK requires a storage backend, and there is currently only
[JolocomTypeormStorage](https://github.com/jolocom/sdk-storage-typeorm)
implemented. An example typeorm configuration `ormconfig.ts` is provided below

```ts
// ormconfig.ts

import { entityList } from '@jolocom/sdk-storage-typeorm'
import { ConnectionOptions } from 'typeorm'

// TODO Add migrations when you create any!
const migrations: any[] = []

export default {
  type: 'react-native',
  database: 'MyApplicationData',
  location: 'default',
  logging: ['error', 'warn', 'schema'],
  entities: entityList,
  migrations,
  migrationsRun: true,
  synchronize: false,
  cli: {
    migrationsDir: 'src/migrations',
  },
} as ConnectionOptions
```

## Usage

Create an initializer function as follows and call it at an appropriate point
during app initialisation. Note that it needs to be asynchronous due to typeorm
setting up a database connection.

```ts
import {
  JolocomSDK,
  JolocomTypeormStorage,
  JolocomKeychainPasswordStore,
} from 'react-native-jolocom'

import { createConnection } from 'typeorm'
import ormconfig from './ormconfig.ts'

async function initJolocom() {
  const conn = await createConnection(ormconfig)
  const storage = new JolocomTypeormStorage(conn)
  const passwordStore = new JolocomKeychainPasswordStore()
  return new JolocomSDK({ storage, passwordStore })
}
```

The SDK instance can be used as usual. Refer to
https://github.com/jolocom/jolocom-sdk
