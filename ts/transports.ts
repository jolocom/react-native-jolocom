import { ChannelTransportAPI, ChannelTransportType, ChannelTransport  } from '@jolocom/sdk/js/src/lib/channels'
import { JolocomSDK, JolocomPlugin } from '@jolocom/sdk'

export class JolocomWebSockets implements JolocomPlugin {
  async register(sdk: JolocomSDK) {
    await sdk.channels.registerTransportHandler(
      ChannelTransportType.WebSockets, this.startChannelTransport.bind(this)
    )
  }

  startChannelTransport(transport: ChannelTransport) {
    console.log('ws transport', transport)
    return new WebSocketsChannelTransport(transport)
 }
}

class WebSocketsChannelTransport implements ChannelTransportAPI {
  private ws: WebSocket
  private _receivePromise: Promise<string> | null = null
  private _resolveReceive?: (msg: string) => void
  public ready: Promise<void>

  constructor(transport: ChannelTransport) {
    const ws = this.ws = new WebSocket(transport.config)
    this.ready = new Promise((resolve, reject) => {
      let ready = false

      ws.addEventListener('error', (ev) => {
        console.error('websockets error', ev)
        if (!ready) {
          reject(ev)
        }
      })

      // TODO check for open errors and reject the promise
      ws.addEventListener('open', (ev) => {
        console.log('websockets opem', ev)
        resolve()
      });

      ws.addEventListener('close', () => {
        // TODO check for close errors and reject the promise
      })

      ws.addEventListener('message', async (message) => {
        // FIXME
        if (!ready) {
          ready = true
          console.log('WebSocket got first message! Ready! FIXME!')
        } else {
          this.onMessage(message.data)
        }
      })
    })
  }

  send(msg: string) {
    // FIXME don't JSON.stringify
    // currently being done because of hapi payload processing
    this.ws.send(JSON.stringify(msg))
  }

  onMessage(msg: string) {
    const data = msg.trim()
    if (!data.length) {
      console.error('Empty Message!')
      return
    }
    this.receive()
    this._resolveReceive && this._resolveReceive(data)
  }

  async receive(): Promise<string> {
    if (!this._receivePromise) {
      this._receivePromise = new Promise(resolve => {
        this._resolveReceive = (msg: string) => {
          resolve(msg)
          this._receivePromise = null
        }
      })
    }
    return this._receivePromise
  }

  stop() {
    this.ws.close()
  }
}

