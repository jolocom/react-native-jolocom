"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecureStorage = void 0;
const tslib_1 = require("tslib");
const react_native_encrypted_storage_1 = tslib_1.__importDefault(require("react-native-encrypted-storage"));
const Keychain = tslib_1.__importStar(require("react-native-keychain"));
class SecureStorage {
    static storeValue(key, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield react_native_encrypted_storage_1.default.setItem(key, value);
        });
    }
    static getValue(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield react_native_encrypted_storage_1.default.getItem(key);
            // NOTE: Migration from the Keychain package
            if (!result) {
                const deprecatedResult = yield Keychain.getGenericPassword({
                    service: key,
                });
                if (!deprecatedResult)
                    return null;
                yield this.storeValue(key, deprecatedResult.password);
                return deprecatedResult.password;
            }
            return result;
        });
    }
    static removeValue(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield react_native_encrypted_storage_1.default.removeItem(key);
        });
    }
}
exports.SecureStorage = SecureStorage;
