import { generateToken, verifyToken, hashPassword, comparePasswords } from './crypto';
import { db } from '../storage/IndexedDBService';

class AuthService {
  constructor() {
    this.initialized = false;
    console.log('Auth Service initialized');
  }

  async initialize() {
    if (this.initialized) {
      console.log('Auth service already initialized');
      return;
    }

    console.log('Initializing auth service...');
    try {
      await db.connect();
      await this.initializeAdmin();
      this.initialized = true;
      console.log('Auth service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize auth service:', error);
      throw error;
    }
  }

  async initializeAdmin() {
    try {
      console.log('Checking for admin user...');
      const adminEmail = 'marcovanthiel@gmail.com';
      let admin = await db.getByIndex('users', 'email', adminEmail);
      
      if (!admin) {
        console.log('Admin user not found, creating...');
        const hashedPassword = await hashPassword('Admin123!');
        const adminData = {
          email: adminEmail,
          name: 'Marco van Thiel',
          password: hashedPassword,
          role: 'admin',
          createdAt: new Date().toISOString()
        };
        console.log('Creating admin with data:', { ...adminData, password: '[HIDDEN]' });
        
        try {
          await db.clear('users'); // Clear any existing users
          const adminId = await db.add('users', adminData);
          console.log('Admin user created successfully with ID:', adminId);
        } catch (error) {
          console.error('Failed to create admin user:', error);
          throw error;
        }
      } else {
        console.log('Admin user already exists:', { ...admin, password: '[HIDDEN]' });
      }
    } catch (error) {
      console.error('Failed to initialize admin:', error);
      throw error;
    }
  }

  async login(email, password) {
    console.log('Attempting login for:', email);
    try {
      const user = await db.getByIndex('users', 'email', email);
      console.log('User lookup result:', user ? { ...user, password: '[HIDDEN]' } : 'Not found');

      if (!user) {
        console.log('Login failed: User not found');
        throw new Error('Invalid credentials');
      }

      const isValid = await comparePasswords(password, user.password);
      console.log('Password validation:', isValid ? 'successful' : 'failed');

      if (!isValid) {
        console.log('Login failed: Invalid password');
        throw new Error('Invalid credentials');
      }

      const token = await this.generateAuthToken(user);
      console.log('Login successful, token generated');

      return { 
        user: this.sanitizeUser(user), 
        token 
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async generateAuthToken(user) {
    console.log('Generating auth token for user:', user.id);
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };
    return generateToken(payload);
  }

  async validateToken(token) {
    console.log('Validating token...');
    try {
      const payload = await verifyToken(token);
      if (!payload) {
        console.log('Token validation failed: Invalid payload');
        return null;
      }

      console.log('Token payload:', payload);
      const user = await db.get('users', payload.userId);
      
      if (!user) {
        console.log('Token validation failed: User not found');
        return null;
      }

      console.log('Token validation successful');
      return this.sanitizeUser(user);
    } catch (error) {
      console.error('Token validation error:', error);
      return null;
    }
  }

  sanitizeUser(user) {
    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
  }
}

export const authService = new AuthService();