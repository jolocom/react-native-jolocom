"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JolocomDeepLinkingTransport = void 0;
const tslib_1 = require("tslib");
const sdk_1 = require("@jolocom/sdk");
/**
 * Deep Linking transport plugin,
 * where you can inject your prefered Linking implementation
 *
 * usage: sdk.usePlugins(new JolocomDeepLinkingTransport(new YourLinkingProvider()))

 */
class JolocomDeepLinkingTransport {
    constructor(_linking) {
        this._linking = _linking;
        this._sdk = undefined;
    }
    register(sdk) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((res) => {
                this._sdk = sdk;
                sdk.transports.register(sdk_1.InteractionTransportType.Deeplink, this);
                res();
            });
        });
    }
    start(transport, onMessage) {
        var _a;
        this._linking.subscribe(onMessage);
        if (this._sdk) {
            return (_a = this._sdk) === null || _a === void 0 ? void 0 : _a.transports.http.start(transport, onMessage);
        }
        else {
            throw new Error(`SDK is not defined. You likely fortgot to register ${JolocomDeepLinkingTransport.name} plugin`);
        }
    }
}
exports.JolocomDeepLinkingTransport = JolocomDeepLinkingTransport;
