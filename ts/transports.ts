import { Linking } from 'react-native'
import { JolocomSDK, JolocomPlugin, InteractionTransportType, TransportDesc, TransportAPI } from '@jolocom/sdk'

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

export enum LinkingErrorCode {
  LinkCannotBeOpened = 'LinkCannotBeOpened'
}
