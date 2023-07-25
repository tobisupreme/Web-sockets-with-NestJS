import { INestApplicationContext, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

export class SocketIoAdapter extends IoAdapter {
  private readonly logger = new Logger('SocketIoAdapter');
  constructor(
    private app: INestApplicationContext,
    private configService: ConfigService,
    private origins?: any,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const corsOptions = this.origins;
    const optionsWithCors: ServerOptions = {
      ...options,
      ...(corsOptions && { cors: { origin: this.origins } }),
    };

    const server = super.createIOServer(port, optionsWithCors);
    return server;
  }
}
