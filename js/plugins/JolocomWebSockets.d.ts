import { JolocomSDK, JolocomPlugin } from '@jolocom/sdk';
export declare class JolocomWebSockets implements JolocomPlugin {
    register(sdk: JolocomSDK): Promise<void>;
}
