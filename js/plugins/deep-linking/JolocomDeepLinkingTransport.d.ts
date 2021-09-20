import { JolocomPlugin, JolocomSDK, TransportAPI, TransportDesc, TransportMessageHandler } from '@jolocom/sdk';
import { DeepLinkingProvider } from './DeepLinkingProvider';
/**
 * Deep Linking transport plugin,
 * where you can inject your prefered Linking implementation
 *
 * usage: sdk.usePlugins(new JolocomDeepLinkingTransport(new YourLinkingProvider()))

 */
export declare class JolocomDeepLinkingTransport implements JolocomPlugin {
    private _linking;
    private _sdk;
    constructor(_linking: DeepLinkingProvider);
    register(sdk: JolocomSDK): Promise<void>;
    start(transport: TransportDesc, onMessage?: TransportMessageHandler): TransportAPI;
}
