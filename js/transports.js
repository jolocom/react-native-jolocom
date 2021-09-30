"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkingErrorCode = exports.JolocomLinking = exports.JolocomWebSockets = void 0;
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
var LinkingErrorCode;
(function (LinkingErrorCode) {
    LinkingErrorCode["LinkCannotBeOpened"] = "LinkCannotBeOpened";
})(LinkingErrorCode = exports.LinkingErrorCode || (exports.LinkingErrorCode = {}));
