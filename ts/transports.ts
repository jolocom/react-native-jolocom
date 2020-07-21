import { Linking } from 'react-native'
import { JolocomSDK, JolocomPlugin, JSONWebToken } from '@jolocom/sdk'
import { InteractionTransportType } from '@jolocom/sdk/js/src/lib/interactionManager/types'
import { InteractionTransport, InteractionTransportAPI } from '@jolocom/sdk/js/src/lib/interactionManager/interactionManager'

export class JolocomLinking implements JolocomPlugin {
  async register(sdk: JolocomSDK) {
    await sdk.interactionManager.registerTransportHandler(
      InteractionTransportType.Deeplink, this.startTransport.bind(this)
    )
  }

  startTransport(config: InteractionTransport): InteractionTransportAPI {
    const { callbackURL } = config
    return {
      send: async (token: JSONWebToken<any>) => {
        const callback = `${callbackURL}/${token.encode()}`
        if (!(await Linking.canOpenURL(callback))) {
          throw new Error(ErrorCode.DeepLinkCannotBeOpened)
        }

        return Linking.openURL(callback).then(() => {})
      }
    }
 }
}

export enum ErrorCode {
  LinkCannotBeOpened = 'LinkCannotBeOpened'
}
