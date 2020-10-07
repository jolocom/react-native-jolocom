"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JolocomKeychainPasswordStore = void 0;
const tslib_1 = require("tslib");
const Keychain = tslib_1.__importStar(require("react-native-keychain"));
const randomBytes = require('react-native-randomBytes');
/**
 * This PasswordStore will use the Android/iOS native secure storage to store a
 * randomly generated 32byte password
 */
class JolocomKeychainPasswordStore {
    constructor() {
        this.service = 'jolocom';
        this.username = 'JolocomSmartWallet';
        this.nativeLib = Keychain;
    }
    setPassword(password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.nativeLib.setGenericPassword(this.username, password, {
                service: this.service,
                storage: Keychain.STORAGE_TYPE.AES,
            });
        });
    }
    getPassword() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.nativeLib.getGenericPassword({
                service: this.service
            });
            if (result === false) {
                // there is no password stored
                const password = yield new Promise((res, rej) => {
                    randomBytes(32, (err, bytes) => {
                        if (err)
                            return rej(err);
                        res(bytes);
                    });
                });
                yield this.setPassword(password);
                return password;
            }
            else {
                return result.password;
            }
        });
    }
}
exports.JolocomKeychainPasswordStore = JolocomKeychainPasswordStore;
