import { JolocomSDK, JolocomPlugin, TransportDesc, TransportAPI } from '@jolocom/sdk';
export declare class JolocomWebSockets implements JolocomPlugin {
    register(sdk: JolocomSDK): Promise<void>;
}
export declare class JolocomLinking implements JolocomPlugin {
    register(sdk: JolocomSDK): Promise<void>;
    start(transport: TransportDesc): TransportAPI;
}
export declare enum LinkingErrorCode {
    LinkCannotBeOpened = "LinkCannotBeOpened"
}
