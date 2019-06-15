import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { AmendService } from 'src/services'
import { Inject } from '@nestjs/common'
import { tryCatch } from 'src/decorators'

@WebSocketGateway()
export class AmendGateway {
  constructor(
    @Inject('AmendService')
    private readonly amendService: AmendService
  ) {}

  @WebSocketServer()
  io: Server

  @SubscribeMessage('amend')
  @tryCatch
  async handleAmend(client: Socket, message: { data: { id: string } }) {
    const response = await this.amendService.getAmend(message.data.id)
    client.emit('amend/' + message.data.id, response)
  }

  @SubscribeMessage('postAmend')
  @tryCatch
  async handlePostAmend(
    client: Socket,
    message: {
      token: string
      data: {
        name: string
        description: string
        patch: string
        version: number
        textID: string
      }
    }
  ) {
    const response = await this.amendService.postAmend(
      message.data,
      message.token,
      this.io
    )

    client.emit('postAmend', response)
  }

  @SubscribeMessage('upVoteAmend')
  @tryCatch
  async handleUpVoteAmend(
    client: Socket,
    message: { token: string; data: { id: string } }
  ) {
    const response = await this.amendService.upVoteAmend(
      message.data.id,
      message.token,
      this.io
    )

    client.emit('upVoteAmend', response)
  }

  @SubscribeMessage('downVoteAmend')
  @tryCatch
  async handleDownVoteAmend(
    client: Socket,
    message: { token: string; data: { id: string } }
  ) {
    const response = await this.amendService.downVoteAmend(
      message.data.id,
      message.token,
      this.io
    )

    client.emit('downVoteAmend', response)
  }

  @SubscribeMessage('indVoteAmend')
  @tryCatch
  async handleIndVoteAmend(
    client: Socket,
    message: { token: string; data: { id: string } }
  ) {
    const response = await this.amendService.upVoteAmend(
      message.data.id,
      message.token,
      this.io
    )

    client.emit('indVoteAmend', response)
  }

  @SubscribeMessage('unVoteAmend')
  @tryCatch
  async handleUnVoteAmend(
    client: Socket,
    message: { token: string; data: { id: string } }
  ) {
    const response = await this.amendService.unVoteAmend(
      message.data.id,
      message.token,
      this.io
    )

    client.emit('unVoteAmend', response)
  }

  @SubscribeMessage('postArgument')
  @tryCatch
  async handlePostArgument(
    client: Socket,
    message: {
      token: string
      data: { amendID: string; text: string; type: string }
    }
  ) {
    const response: any = await this.amendService.postArgument(
      message.data.text,
      message.data.type,
      message.data.amendID,
      message.token
    )

    if (response.data) {
      this.io.emit('amend/' + message.data.amendID, response)
    } else {
      client.emit('postArgument', response)
    }
  }

  @SubscribeMessage('upVoteArgument')
  @tryCatch
  async handleUpVoteArgument(
    client: Socket,
    message: { token: string; data: { amendID: string; argumentID: string } }
  ) {
    const response: any = await this.amendService.upVoteArgument(
      message.data.amendID,
      message.data.argumentID,
      message.token
    )

    if (response.data) {
      this.io.emit('amend/' + message.data.amendID, response)
    } else {
      client.emit('upVoteArgument', response)
    }
  }

  @SubscribeMessage('downVoteArgument')
  @tryCatch
  async handleDownVoteArgument(
    client: Socket,
    message: { token: string; data: { amendID: string; argumentID: string } }
  ) {
    const response: any = await this.amendService.downVoteArgument(
      message.data.amendID,
      message.data.argumentID,
      message.token
    )

    if (response.data) {
      this.io.emit('amend/' + message.data.amendID, response)
    } else {
      client.emit('unVoteArgument', response)
    }
  }

  @SubscribeMessage('unVoteArgument')
  @tryCatch
  async handleUnVoteArgument(
    client: Socket,
    message: { token: string; data: { amendID: string; argumentID: string } }
  ) {
    const response: any = await this.amendService.unVoteArgument(
      message.data.amendID,
      message.data.argumentID,
      message.token
    )

    if (response.data) {
      this.io.emit('amend/' + message.data.amendID, response)
    } else {
      client.emit('unVoteArgument', response)
    }
  }
}
