"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JolocomKeychainPasswordStore = void 0;
const tslib_1 = require("tslib");
const react_native_randombytes_1 = require("react-native-randombytes");
const secureStorage_1 = require("./secureStorage");
/**
 * This PasswordStore will use the Android/iOS native secure storage to store a
 * randomly generated 32 byte password. Natively, iOS uses the Keychain API
 * while Android uses the EncryptedSharedPreferences.
 */
class JolocomKeychainPasswordStore {
    constructor() {
        this.key = 'jolocom';
    }
    setPassword(password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield secureStorage_1.SecureStorage.storeValue(this.key, password);
        });
    }
    getPassword() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let password = yield secureStorage_1.SecureStorage.getValue(this.key);
            if (!password) {
                password = react_native_randombytes_1.randomBytes(32).toString('base64');
                yield this.setPassword(password);
            }
            return password;
        });
    }
}
exports.JolocomKeychainPasswordStore = JolocomKeychainPasswordStore;
