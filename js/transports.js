"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = exports.JolocomLinking = exports.JolocomWebSockets = void 0;
const tslib_1 = require("tslib");
const react_native_1 = require("react-native");
const channels_1 = require("@jolocom/sdk/js/src/lib/channels");
const types_1 = require("@jolocom/sdk/js/src/lib/interactionManager/types");
class JolocomWebSockets {
    register(sdk) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield sdk.channels.registerTransportHandler(channels_1.ChannelTransportType.WebSockets, this.startChannelTransport.bind(this));
        });
    }
    startChannelTransport(transport) {
        console.log('ws transport', transport);
        return new WebSocketsChannelTransport(transport);
    }
}
exports.JolocomWebSockets = JolocomWebSockets;
class WebSocketsChannelTransport {
    constructor(transport) {
        this._receivePromise = null;
        const ws = this.ws = new WebSocket(transport.config);
        this.ready = new Promise((resolve, reject) => {
            let ready = false;
            ws.addEventListener('error', (ev) => {
                console.error('websockets error', ev);
                if (!ready) {
                    reject(ev);
                }
            });
            // TODO check for open errors and reject the promise
            ws.addEventListener('open', (ev) => {
                console.log('websockets opem', ev);
                resolve();
            });
            ws.addEventListener('close', () => {
                // TODO check for close errors and reject the promise
            });
            ws.addEventListener('message', (message) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                // FIXME
                if (!ready) {
                    ready = true;
                    console.log('WebSocket got first message! Ready! FIXME!');
                }
                else {
                    this.onMessage(message.data);
                }
            }));
        });
    }
    send(msg) {
        // FIXME don't JSON.stringify
        // currently being done because of hapi payload processing
        this.ws.send(JSON.stringify(msg));
    }
    onMessage(msg) {
        const data = msg.trim();
        if (!data.length) {
            // FIXME should we just be silently ignoring these?
            return;
        }
        this.receive();
        this._resolveReceive && this._resolveReceive(data);
    }
    receive() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this._receivePromise) {
                this._receivePromise = new Promise(resolve => {
                    this._resolveReceive = (msg) => {
                        resolve(msg);
                        this._receivePromise = null;
                    };
                });
            }
            return this._receivePromise;
        });
    }
    stop() {
        this.ws.close();
    }
}
class JolocomLinking {
    register(sdk) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield sdk.interactionManager.registerTransportHandler(types_1.InteractionTransportType.Deeplink, this.startTransport.bind(this));
        });
    }
    startTransport(transport) {
        const { callbackURL } = transport;
        return {
            send: (token) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const callback = `${callbackURL}/${token.encode()}`;
                if (!(yield react_native_1.Linking.canOpenURL(callback))) {
                    throw new Error(ErrorCode.LinkCannotBeOpened);
                }
                return react_native_1.Linking.openURL(callback);
            })
        };
    }
}
exports.JolocomLinking = JolocomLinking;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["LinkCannotBeOpened"] = "LinkCannotBeOpened";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
