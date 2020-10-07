import * as Keychain from 'react-native-keychain'
import { IPasswordStore } from '@jolocom/sdk/js/storage'

const randomBytes = require('react-native-randombytes').randomBytes

/**
 * This PasswordStore will use the Android/iOS native secure storage to store a
 * randomly generated 32byte password
 */
export class JolocomKeychainPasswordStore implements IPasswordStore {
  private service = 'jolocom'
  private username = 'JolocomSmartWallet'
  private nativeLib = Keychain

  private async setPassword(password: string): Promise<void> {
    await this.nativeLib.setGenericPassword(this.username, password, {
      service: this.service,
      storage: Keychain.STORAGE_TYPE.AES,
    })
  }

  async getPassword(): Promise<string> {
    const result = await this.nativeLib.getGenericPassword({
      service: this.service
    })

    if (result === false) {
      // there is no password stored
      const password = randomBytes(32).toString('base64')
      await this.setPassword(password)
      return password
    } else {
      return result.password
    }
  }
}
