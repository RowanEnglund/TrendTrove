import { Injectable } from '@nestjs/common';
import { users, User } from './user.store';

@Injectable()
export class UserService {
  findAll(): User[] {
    return users;
  }

  updateRole(id: string, role: 'user' | 'admin'): User {
    const user = users.find((user) => user.id === id);
    if (user) {
      user.role = role;
      return user;
    }
    return null;
  }
}
