import {
  InteractionTransportType,
  JolocomPlugin,
  JolocomSDK,
  TransportAPI,
  TransportDesc,
  TransportMessageHandler,
} from '@jolocom/sdk'

/**
 * A provider to extend when creating your
 * own linking strategy
 */
export abstract class DeepLinkingProvider {
  public abstract subscribe(handler?: (token: string) => Promise<void>): void
}

/**
 * Deep Linking transport plugin,
 * where you can inject your prefered Linking implementation 
 * 
 * usage: sdk.usePlugins(new JolocomDeepLinkingTransport(new YourLinkingProvider()))

 */
export class JolocomDeepLinkingTransport implements JolocomPlugin {
  private _sdk: JolocomSDK | undefined = undefined

  constructor(private _linking: DeepLinkingProvider) {}

  async register(sdk: JolocomSDK): Promise<void> {
    return new Promise((res) => {
      this._sdk = sdk
      sdk.transports.register(InteractionTransportType.Deeplink, this)
      res()
    })
  }

  start(
    transport: TransportDesc,
    onMessage?: TransportMessageHandler,
  ): TransportAPI {
    this._linking.subscribe(onMessage)

    if (this._sdk) {
      return this._sdk?.transports.http.start(transport, onMessage)
    } else {
      throw new Error(
        `SDK is not defined. You likely fortgot to register ${JolocomDeepLinkingTransport.name} plugin`,
      )
    }
  }
}
