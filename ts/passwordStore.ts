import { IPasswordStore } from '@jolocom/sdk/js/storage'
// @ts-expect-error No declaration file
import { randomBytes } from 'react-native-randombytes'
import { SecureStorage } from './secureStorage'

/**
 * This PasswordStore will use the Android/iOS native secure storage to store a
 * randomly generated 32 byte password. Natively, iOS uses the Keychain API
 * while Android uses the EncryptedSharedPreferences.
 */

export class JolocomKeychainPasswordStore implements IPasswordStore {
  private key = 'jolocom'

  private async setPassword(password: string): Promise<void> {
    await SecureStorage.storeValue(this.key, password)
  }

  async getPassword(): Promise<string> {
    let password = await SecureStorage.getValue(this.key)

    if (!password) {
      password = randomBytes(32).toString('base64') as string
      await this.setPassword(password)
    }

    return password
  }
}
