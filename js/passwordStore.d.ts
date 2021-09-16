import { IPasswordStore } from '@jolocom/sdk/js/storage';
/**
 * This PasswordStore will use the Android/iOS native secure storage to store a
 * randomly generated 32 byte password. Natively, iOS uses the Keychain API
 * while Android uses the EncryptedSharedPreferences.
 */
export declare class JolocomKeychainPasswordStore implements IPasswordStore {
    private key;
    private setPassword;
    getPassword(): Promise<string>;
}
