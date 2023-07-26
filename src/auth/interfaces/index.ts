import { Socket } from 'socket.io';

export interface AuthPayload {
  sub: number;
  username: string;
}

export interface JwtToken {
  access_token: string;
}

export type SocketWithAuth = Socket & { user: AuthPayload };
