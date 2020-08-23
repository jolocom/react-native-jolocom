# react-native-jolocom

[Jolocom SDK](https://github.com/jolocom/jolocom-sdk) integration with React
Native.

## Getting started

### Install

`$ npm install react-native-jolocom --save`

OR

`$ yarn add react-native-jolocom`

### Mostly automatic installation

`$ react-native link react-native-jolocom`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-jolocom` and add `RNJolocom.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNJolocom.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNJolocomPackage;` to the imports at the top of the file
  - Add `new RNJolocomPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
    ```
    include ':react-native-jolocom'
    project(':react-native-jolocom').projectDir = new File(rootProject.projectDir,  '../node_modules/react-native-jolocom/android')
    ```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
    ```
      compile project(':react-native-jolocom')
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
      '@jolocom/native-core-node': require.resolve('@jolocom/native-core-react-native')
    },
  },
}
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
