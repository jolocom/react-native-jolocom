import EncryptedStorage from 'react-native-encrypted-storage'
import { IPasswordStore } from '@jolocom/sdk/js/storage'
// @ts-expect-error No declaration file
import { randomBytes } from 'react-native-randombytes'

/**
 * This PasswordStore will use the Android/iOS native secure storage to store a
 * randomly generated 32 byte password. Natively, iOS uses the Keychain API
 * while Android uses the EncryptedSharedPreferences.
 */

export class JolocomKeychainPasswordStore implements IPasswordStore {
  private key = 'encryptionPassword'

  private async setPassword(password: string): Promise<void> {
    await EncryptedStorage.setItem(this.key, password)
  }

  async getPassword(): Promise<string> {
    let password = await EncryptedStorage.getItem(this.key)

    if (!password) {
      password = randomBytes(32).toString('base64') as string
      await this.setPassword(password)
    }

    return password
  }
}
