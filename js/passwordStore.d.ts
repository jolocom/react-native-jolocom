import { IPasswordStore } from '@jolocom/sdk/js/storage';
/**
 * This PasswordStore will use the Android/iOS native secure storage to store a
 * randomly generated 32byte password
 */
export declare class JolocomKeychainPasswordStore implements IPasswordStore {
    private service;
    private username;
    private nativeLib;
    private setPassword;
    getPassword(): Promise<string>;
}
