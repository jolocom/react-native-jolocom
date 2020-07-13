"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-ignore
const react_native_1 = require("react-native");
const { RNJolocom } = react_native_1.NativeModules;
exports.default = RNJolocom;
tslib_1.__exportStar(require("./storage"), exports);
tslib_1.__exportStar(require("./passwordStore"), exports);
tslib_1.__exportStar(require("@jolocom/sdk"), exports);
/**
 * Some hax required for Reach Native
 */
// react-native overrides Object.assign with a non-spec-compliant version.
// bring it back because some dependencies break otherwise
const assign = require('object.assign/implementation');
Object.assign = assign;
// react-native uses a old version of JS Core that does not support
// String.prototype.normalize. This is used in bip39 and therefore needs a polyfill
String.prototype.normalize = function (form) {
    return require('unorm')[String(form).toLowerCase()](this);
};
// required as some dependencies (ethereum stuff) think we are node and check
// the version
process.version = 'v11.13.0';
/**
 * Object.setPrototypeOf polyfill because typeorm (and possibly others) use it
 */
// @ts-ignore
if (!Object.setPrototypeOf) {
    // @ts-ignore
    Object.setPrototypeOf = function (obj, proto) {
        obj.__proto__ = proto;
        return obj;
    };
}
// Needed so we can post DID documents to IPFS nodes. Regular fetch has issues
// related to multi-part data / boundries
const rn_fetch_blob_1 = tslib_1.__importDefault(require("rn-fetch-blob"));
// @ts-ignore
global.fetch = new rn_fetch_blob_1.default.polyfill.Fetch({ auto: true }).build();
// @ts-ignore
global.Blob = rn_fetch_blob_1.default.polyfill.Blob;
