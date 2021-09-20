import { JolocomSDK, JolocomPlugin } from '@jolocom/sdk'

export class JolocomWebSockets implements JolocomPlugin {
  register(sdk: JolocomSDK): Promise<void> {
    return new Promise((res) => {
      sdk.transports.ws.configure({ WebSocket })
      res()
    })
  }
}
