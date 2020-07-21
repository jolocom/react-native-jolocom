import { JolocomSDK, JolocomPlugin } from '@jolocom/sdk';
import { InteractionTransport, InteractionTransportAPI } from '@jolocom/sdk/js/src/lib/interactionManager/interactionManager';
export declare class JolocomLinking implements JolocomPlugin {
    register(sdk: JolocomSDK): Promise<void>;
    startTransport(config: InteractionTransport): InteractionTransportAPI;
}
export declare enum ErrorCode {
    DeepLinkCannotBeOpened = "DeepLinkCannotBeOpened"
}
