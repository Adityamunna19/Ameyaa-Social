import { SignJWT, jwtVerify } from 'jose';
import { User } from '../types/auth';
import { db } from '../db/index';

const SECRET = new TextEncoder().encode('your-secret-key');

export const authService = {
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = await db.findUserByEmail(email);
    
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = await new SignJWT({ sub: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(SECRET);

    return { user: userWithoutPassword, token };
  },

  async signup(email: string, password: string, name: string): Promise<{ user: User; token: string }> {
    const existingUser = await db.findUserByEmail(email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const newUser = {
      email,
      password,
      name,
      role: 'user' as const,
    };

    const id = await db.createUser(newUser);
    const { password: _, ...userWithoutPassword } = { ...newUser, id };

    const token = await new SignJWT({ sub: id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(SECRET);

    return { user: userWithoutPassword, token };
  },

  async verifyToken(token: string): Promise<string> {
    try {
      const { payload } = await jwtVerify(token, SECRET);
      return payload.sub as string;
    } catch {
      throw new Error('Invalid token');
    }
  }
};