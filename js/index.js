"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_native_1 = require("react-native");
const { RNJolocom } = react_native_1.NativeModules;
exports.default = RNJolocom;
tslib_1.__exportStar(require("./storage"), exports);
tslib_1.__exportStar(require("./passwordStore"), exports);
tslib_1.__exportStar(require("./secureStorage"), exports);
tslib_1.__exportStar(require("@jolocom/sdk"), exports);
tslib_1.__exportStar(require("jolocom-lib"), exports);
/**
 * Some hax required for Reach Native
 */
// react-native overrides Object.assign with a non-spec-compliant version.
// bring it back because some dependencies break otherwise
// eslint-disable-next-line
const assign = require('object.assign/implementation');
// eslint-disable-next-line
Object.assign = assign;
// react-native uses a old version of JS Core that does not support
// String.prototype.normalize. This is used in bip39 and therefore needs a polyfill
String.prototype.normalize = function (form) {
    // eslint-disable-next-line
    return require('unorm')[String(form).toLowerCase()](this);
};
// required as some dependencies (ethereum stuff) think we are node and check
// the version
process.version = 'v11.13.0';
/**
 * Object.setPrototypeOf polyfill because typeorm (and possibly others) use it
 */
if (!Object.setPrototypeOf) {
    Object.setPrototypeOf = function (obj, proto) {
        // eslint-disable-next-line
        obj.__proto__ = proto;
        // eslint-disable-next-line
        return obj;
    };
}
// NOTE: the below code was needed so we can POST DID documents to IPFS nodes.
// Regular fetch has issues related to multi-part data / boundries
// BUT we don't use it anymore as jolo identities are not being created on RN
// anymore
//import RNFetchBlob from 'rn-fetch-blob'
//global.fetch = new RNFetchBlob.polyfill.Fetch({ auto: true }).build()
//global.Blob = RNFetchBlob.polyfill.Blob
