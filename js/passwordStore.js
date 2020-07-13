"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JolocomKeychainPasswordStore = void 0;
const tslib_1 = require("tslib");
const Keychain = tslib_1.__importStar(require("react-native-keychain"));
class JolocomKeychainPasswordStore {
    constructor() {
        this.username = 'JolocomSmartWallet';
        this.nativeLib = Keychain;
    }
    savePassword(password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.nativeLib.setGenericPassword(this.username, password);
        });
    }
    getPassword() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.nativeLib.getGenericPassword();
            if (typeof result === 'boolean') {
                throw new Error('Password could not be retrieved from the keychain');
            }
            return result.password;
        });
    }
}
exports.JolocomKeychainPasswordStore = JolocomKeychainPasswordStore;
