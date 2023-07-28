import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketWithAuth } from './auth/interfaces';

@WebSocketGateway()
export class AppGateway {
  private logger: Logger = new Logger('AppGateway');

  @WebSocketServer()
  server: Server;

  afterInit() {
    this.logger.log('Gateway Initialized!');
  }

  handleConnection(client: SocketWithAuth) {
    const sockets = this.server.sockets;

    this.logger.log(`${client.id} connected!`);
    this.logger.debug(`Total connected clients: ${sockets.sockets.size}`);
    this.logger.debug(
      `Connected client payload: ${JSON.stringify(client.user, null, 2)}`,
    );
    const channels = client.user.channels;
    if (channels) {
      channels.forEach((channel) => client.join(channel));
    }
  }

  handleDisconnect(client: SocketWithAuth) {
    const sockets = this.server.sockets;

    this.logger.log(`${client.id} disconnected!`);
    this.logger.debug(`Total connected clients: ${sockets.sockets.size}`);
  }

  public emitToChannel(channel: string, event: string, data: any) {
    this.server.to(channel).emit(event, data);
  }
}
