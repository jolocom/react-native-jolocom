import { JolocomPlugin, JolocomSDK, TransportAPI, TransportDesc } from '@jolocom/sdk';
export declare enum LinkingErrorCode {
    LinkCannotBeOpened = "LinkCannotBeOpened"
}
export declare class JolocomLinking implements JolocomPlugin {
    register(sdk: JolocomSDK): Promise<void>;
    start(transport: TransportDesc): TransportAPI;
}
