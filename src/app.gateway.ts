import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway {
  private logger: Logger = new Logger('AppGateway');

  @WebSocketServer()
  server: Server;

  afterInit() {
    this.logger.log('Gateway Initialized!');
  }

  handleConnection(client: Socket) {
    const sockets = this.server.sockets;

    this.logger.log(`${client.id} connected!`);
    this.logger.debug(`Total connected clients: ${sockets.sockets.size}`);

    this.server.emit('message', `from ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const sockets = this.server.sockets;

    this.logger.log(`${client.id} disconnected!`);
    this.logger.debug(`Total connected clients: ${sockets.sockets.size}`);
  }
}
