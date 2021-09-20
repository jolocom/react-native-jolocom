import {
  InteractionTransportType,
  JolocomPlugin,
  JolocomSDK,
  TransportAPI,
  TransportDesc,
} from '@jolocom/sdk'
import { Linking } from 'react-native'

export enum LinkingErrorCode {
  LinkCannotBeOpened = 'LinkCannotBeOpened',
}

export class JolocomLinking implements JolocomPlugin {
  register(sdk: JolocomSDK): Promise<void> {
    return new Promise((res) => {
      sdk.transports.register(InteractionTransportType.Deeplink, this)
      res()
    })
  }

  start(transport: TransportDesc): TransportAPI {
    const config = transport.config as Record<string, string>
    return {
      send: async (msg: string) => {
        if (!config.callbackURL)
          throw new Error(
            `No callback URL was provided inside ${JolocomLinking.name} plugin`,
          )
        const callback = `${config.callbackURL}/${msg}`
        if (!(await Linking.canOpenURL(callback))) {
          throw new Error(LinkingErrorCode.LinkCannotBeOpened)
        }

        return Linking.openURL(callback)
      },
    }
  }
}
