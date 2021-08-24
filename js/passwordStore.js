"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JolocomKeychainPasswordStore = void 0;
const tslib_1 = require("tslib");
const react_native_encrypted_storage_1 = tslib_1.__importDefault(require("react-native-encrypted-storage"));
// @ts-expect-error No declaration file
const react_native_randombytes_1 = require("react-native-randombytes");
/**
 * This PasswordStore will use the Android/iOS native secure storage to store a
 * randomly generated 32 byte password. Natively, iOS uses the Keychain API
 * while Android uses the EncryptedSharedPreferences.
 */
class JolocomKeychainPasswordStore {
    constructor() {
        this.key = 'encryptionPassword';
    }
    setPassword(password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield react_native_encrypted_storage_1.default.setItem(this.key, password);
        });
    }
    getPassword() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield react_native_encrypted_storage_1.default.getItem(this.key);
            if (!result) {
                const password = react_native_randombytes_1.randomBytes(32).toString('base64');
                yield this.setPassword(password);
                return password;
            }
            else {
                return result;
            }
        });
    }
}
exports.JolocomKeychainPasswordStore = JolocomKeychainPasswordStore;
