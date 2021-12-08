import EncryptedStorage from "react-native-encrypted-storage";
import * as Keychain from "react-native-keychain";

export class SecureStorage {
  static async storeValue(key: string, value: string): Promise<void> {
    await EncryptedStorage.setItem(key, value);
  }

  static async getValue(key: string): Promise<string | null> {
    const result = await EncryptedStorage.getItem(key);

    // NOTE: Migration from the Keychain package
    if (!result) {
      const deprecatedResult = await Keychain.getGenericPassword({
        service: key,
      });
      if (!deprecatedResult) return null;

      await this.storeValue(key, deprecatedResult.password);
      return deprecatedResult.password;
    }

    return result;
  }

  static async removeValue(key: string): Promise<void> {
    await EncryptedStorage.removeItem(key);
  }
}
