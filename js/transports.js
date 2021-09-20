"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkingErrorCode = exports.JolocomDeepLinkingTransport = exports.JolocomLinking = exports.JolocomWebSockets = void 0;
const tslib_1 = require("tslib");
const react_native_1 = require("react-native");
const sdk_1 = require("@jolocom/sdk");
class JolocomWebSockets {
    register(sdk) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield sdk.transports.ws.configure({ WebSocket });
        });
    }
}
exports.JolocomWebSockets = JolocomWebSockets;
class JolocomLinking {
    register(sdk) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield sdk.transports.register(sdk_1.InteractionTransportType.Deeplink, this);
        });
    }
    start(transport) {
        const { config: callbackURL } = transport;
        return {
            send: (msg) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const callback = `${callbackURL}/${msg}`;
                if (!(yield react_native_1.Linking.canOpenURL(callback))) {
                    throw new Error(LinkingErrorCode.LinkCannotBeOpened);
                }
                return react_native_1.Linking.openURL(callback);
            })
        };
    }
}
exports.JolocomLinking = JolocomLinking;
/**
 * Deep Linking transport plugin,
 * where you can inject your prefered Linking implementation
 *
 * usage: sdk.usePlugins(new JolocomDeepLinkingTransport(new YourLinking()))

 */
class JolocomDeepLinkingTransport {
    constructor(_linking) {
        this._linking = _linking;
        this._sdk = undefined;
    }
    register(sdk) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this._sdk = sdk;
            sdk.transports.register(sdk_1.InteractionTransportType.Deeplink, this);
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
var LinkingErrorCode;
(function (LinkingErrorCode) {
    LinkingErrorCode["LinkCannotBeOpened"] = "LinkCannotBeOpened";
})(LinkingErrorCode = exports.LinkingErrorCode || (exports.LinkingErrorCode = {}));
