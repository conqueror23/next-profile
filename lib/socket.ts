import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5005';

class SocketManager {
  private socket: Socket | null = null;
  private isConnected = false;

  connect(): Socket {
    if (!this.socket) {
      console.log('Attempting to connect to Socket.io server at:', SOCKET_URL);
      this.socket = io(SOCKET_URL, {
        transports: ['polling'],
        timeout: 5000,
        reconnection: true,
        reconnectionAttempts: 3,
        reconnectionDelay: 2000,
        forceNew: false,
        autoConnect: true,
        upgrade: false
      });
      this.setupEventListeners();
    }
    return this.socket;
  }

  private setupEventListeners(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      this.isConnected = true;
      console.log('Connected to server');
    });

    this.socket.on('disconnect', (reason) => {
      this.isConnected = false;
      console.log('Disconnected from server:', reason);
    });

    this.socket.on('connect_error', (error) => {
      this.isConnected = false;
      console.error('Connection error:', error.message || error);
    });

    this.socket.on('reconnect', (attemptNumber) => {
      this.isConnected = true;
      console.log('Reconnected to server after', attemptNumber, 'attempts');
    });

    this.socket.on('reconnect_error', (error) => {
      console.error('Reconnection failed:', error.message || error);
    });

    this.socket.on('reconnect_failed', () => {
      console.error('Reconnection failed after all attempts');
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  emit(event: string, data: any): void {
    if (this.socket && this.isConnected) {
      this.socket.emit(event, data);
    }
  }

  on(event: string, callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

export const socketManager = new SocketManager();
export const socket = socketManager.connect();

export const connectServer = (): void => {
  socketManager.connect();
};

export const getMessage = (callback: (data: string) => void): void => {
  socketManager.on('response', callback);
};

export const sendMessage = (message: string, user: string = 'User'): void => {
  socketManager.emit('chatMessage', { user, text: message });
};

export const disconnect = (): void => {
  socketManager.disconnect();
};

