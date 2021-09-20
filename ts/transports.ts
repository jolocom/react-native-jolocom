import { Linking } from 'react-native'
import { DeepLinker } from './deepLinker'
import { JolocomSDK, JolocomPlugin, InteractionTransportType, TransportDesc, TransportAPI, TransportMessageHandler } from '@jolocom/sdk'

export class JolocomWebSockets implements JolocomPlugin {
  async register(sdk: JolocomSDK) {
    await sdk.transports.ws.configure({ WebSocket })
  }
}

export class JolocomLinking implements JolocomPlugin {
  async register(sdk: JolocomSDK) {
    await sdk.transports.register(
      InteractionTransportType.Deeplink, this
    )
  }

  start(transport: TransportDesc): TransportAPI {
    const { config: callbackURL } = transport
    return {
      send: async (msg: string) => {
        const callback = `${callbackURL}/${msg}`
        if (!(await Linking.canOpenURL(callback))) {
          throw new Error(LinkingErrorCode.LinkCannotBeOpened)
        }

        return Linking.openURL(callback)
      }
    }
 }
}

/**
 * Deep Linking transport plugin,
 * where you can inject your prefered Linking implementation
 * 
 * usage: sdk.usePlugins(new JolocomDeepLinkingTransport(new YourLinking()))

 */
export class JolocomDeepLinkingTransport implements JolocomPlugin {
  private _sdk: JolocomSDK | undefined = undefined

  constructor(private _linking: DeepLinker) {}

  async register(sdk: JolocomSDK) {
    this._sdk = sdk
    sdk.transports.register(InteractionTransportType.Deeplink, this)
  }

  start(
    transport: TransportDesc,
    onMessage?: TransportMessageHandler,
  ): TransportAPI {
    this._linking.subscribe(onMessage)

    if(this._sdk) {
      return this._sdk?.transports.http.start(transport, onMessage)
    } else {
      throw new Error (`SDK is not defined. You likely fortgot to register ${JolocomDeepLinkingTransport.name} plugin`)
    }

  }
}

export enum LinkingErrorCode {
  LinkCannotBeOpened = 'LinkCannotBeOpened'
}
