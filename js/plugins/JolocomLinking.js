"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JolocomLinking = exports.LinkingErrorCode = void 0;
const tslib_1 = require("tslib");
const sdk_1 = require("@jolocom/sdk");
const react_native_1 = require("react-native");
var LinkingErrorCode;
(function (LinkingErrorCode) {
    LinkingErrorCode["LinkCannotBeOpened"] = "LinkCannotBeOpened";
})(LinkingErrorCode = exports.LinkingErrorCode || (exports.LinkingErrorCode = {}));
class JolocomLinking {
    register(sdk) {
        return new Promise((res) => {
            sdk.transports.register(sdk_1.InteractionTransportType.Deeplink, this);
            res();
        });
    }
    start(transport) {
        const config = transport.config;
        return {
            send: (msg) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (!config.callbackURL)
                    throw new Error(`No callback URL was provided inside ${JolocomLinking.name} plugin`);
                const callback = `${config.callbackURL}/${msg}`;
                if (!(yield react_native_1.Linking.canOpenURL(callback))) {
                    throw new Error(LinkingErrorCode.LinkCannotBeOpened);
                }
                return react_native_1.Linking.openURL(callback);
            }),
        };
    }
}
exports.JolocomLinking = JolocomLinking;
