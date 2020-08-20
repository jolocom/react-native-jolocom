import { ChannelTransportAPI, ChannelTransport } from '@jolocom/sdk/js/src/lib/channels';
import { JolocomSDK, JolocomPlugin } from '@jolocom/sdk';
import { InteractionTransport, InteractionTransportAPI } from '@jolocom/sdk/js/src/lib/interactionManager/interactionManager';
export declare class JolocomWebSockets implements JolocomPlugin {
    register(sdk: JolocomSDK): Promise<void>;
    startChannelTransport(transport: ChannelTransport): WebSocketsChannelTransport;
}
declare class WebSocketsChannelTransport implements ChannelTransportAPI {
    private ws;
    private _receivePromise;
    private _resolveReceive?;
    ready: Promise<void>;
    constructor(transport: ChannelTransport);
    send(msg: string): void;
    onMessage(msg: string): void;
    receive(): Promise<string>;
    stop(): void;
}
export declare class JolocomLinking implements JolocomPlugin {
    register(sdk: JolocomSDK): Promise<void>;
    startTransport(transport: InteractionTransport): InteractionTransportAPI;
}
export declare enum ErrorCode {
    LinkCannotBeOpened = "LinkCannotBeOpened"
}
export {};
