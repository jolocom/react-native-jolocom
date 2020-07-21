"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = exports.JolocomLinking = void 0;
const tslib_1 = require("tslib");
const react_native_1 = require("react-native");
const types_1 = require("@jolocom/sdk/js/src/lib/interactionManager/types");
class JolocomLinking {
    register(sdk) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield sdk.interactionManager.registerTransportHandler(types_1.InteractionTransportType.Deeplink, this.startTransport.bind(this));
        });
    }
    startTransport(config) {
        const { callbackURL } = config;
        return {
            send: (token) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const callback = `${callbackURL}/${token.encode()}`;
                if (!(yield react_native_1.Linking.canOpenURL(callback))) {
                    throw new Error(ErrorCode.DeepLinkCannotBeOpened);
                }
                return react_native_1.Linking.openURL(callback).then(() => { });
            })
        };
    }
}
exports.JolocomLinking = JolocomLinking;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["DeepLinkCannotBeOpened"] = "DeepLinkCannotBeOpened";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
