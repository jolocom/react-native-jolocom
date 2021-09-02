import { DeepLinker } from './deepLinker';
import { JolocomSDK, JolocomPlugin, TransportDesc, TransportAPI, TransportMessageHandler } from '@jolocom/sdk';
export declare class JolocomWebSockets implements JolocomPlugin {
    register(sdk: JolocomSDK): Promise<void>;
}
export declare class JolocomLinking implements JolocomPlugin {
    register(sdk: JolocomSDK): Promise<void>;
    start(transport: TransportDesc): TransportAPI;
}
/**
 * Deep Linking transport plugin,
 * where you can inject your prefered Linking implementation
 *
 * usage: sdk.usePlugins(new JolocomDeepLinkingTransport(new YourLinking()))

 */
export declare class JolocomDeepLinkingTransport implements JolocomPlugin {
    private _linking;
    private _sdk;
    constructor(_linking: DeepLinker);
    register(sdk: JolocomSDK): Promise<void>;
    start(transport: TransportDesc, onMessage?: TransportMessageHandler): TransportAPI;
}
export declare enum LinkingErrorCode {
    LinkCannotBeOpened = "LinkCannotBeOpened"
}
