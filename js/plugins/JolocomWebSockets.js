"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JolocomWebSockets = void 0;
class JolocomWebSockets {
    register(sdk) {
        return new Promise((res) => {
            sdk.transports.ws.configure({ WebSocket });
            res();
        });
    }
}
exports.JolocomWebSockets = JolocomWebSockets;
