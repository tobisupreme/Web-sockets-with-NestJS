import {
  INestApplicationContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { AuthPayload, SocketWithAuth } from './auth/interfaces';
import { WsException } from '@nestjs/websockets';

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
    const jwtService = this.app.get<JwtService>(JwtService);
    server.use(this.createTokenMiddleware(jwtService, this.logger));
    return server;
  }

  private createTokenMiddleware = (jwtService: JwtService, logger: Logger) => {
    return (socket: SocketWithAuth, next) => {
      let [, token] = String(socket.request.headers['authorization']).split(
        /\s+/,
      );
      if (!token) {
        token = String(socket.request['_query']?.token);
      }
      if (!token) {
        next(new UnauthorizedException());
      }

      try {
        const payload: AuthPayload = jwtService.verify(token);
        socket.user = payload;
        next();
      } catch (error) {
        logger.error(`Error validating token: ${error}`);
        next(new WsException(error));
      }
    };
  };
}
