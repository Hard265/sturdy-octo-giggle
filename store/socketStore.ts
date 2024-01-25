import { makeObservable, observable, action } from 'mobx';
import { io, Socket } from 'socket.io-client';

class SocketStore {
  socket: Socket | null = null;
  connected: boolean = false; // Set to false initially

  constructor() {
    makeObservable(this, {
      socket: observable,
      connected: observable,
      initializeSocket: action,
      disconnect: action,
    });

    // Assuming 'url' is a parameter for initializing the socket
    this.initializeSocket('your_socket_server_url');
  }

  initializeSocket(url: string) {
    this.socket = io(url);

    // Listener for successful connection
    this.socket.on('connect', () => {
      this.connected = true;
    });

    // Listener for disconnection
    this.socket.on('disconnect', () => {
      this.connected = false;
    });

    // Add any additional initialization logic or event listeners here
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default SocketStore;
      
