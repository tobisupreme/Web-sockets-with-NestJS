import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  username: string;
  password: string;
  channels?: string[];
};

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'lola',
      password: 'Password1@',
      channels: ['channel1', 'channel2'],
    },
    {
      userId: 2,
      username: 'precious',
      password: 'Password1@',
    },
    {
      userId: 3,
      username: 'tunji',
      password: 'Password1@',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
