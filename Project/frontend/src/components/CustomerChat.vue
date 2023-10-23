<template>
  <div>
    <div id="chat" ref="messageContainer" class="message-container">
      <div v-for="(message, index) in messages" :key="index" class="message" :class="{ 'customer-message': message.role === 'customer', 'admin-message': message.role === 'admin' }">
        {{ message.username }} ({{ message.role }}): {{ message.message }}
      </div>
    </div>
    <input v-model="messageInput" placeholder="Type your message..." class="text-input" />
    <button @click="sendMessage" class="action-button">Send</button>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      messages: [],
      messageInput: '',
      role: 'customer', // Set the user's role (customer or admin)
      username: 'jj123', // Set the user's username
      customOrderID: '4', // Set the custom order ID
    };
  },
  mounted() {
    // Establish socket connection when the component is mounted
    this.setupSocketConnection();
  },
  methods: {
    setupSocketConnection() {
      const socket = io('http://localhost:8080');

      // Join the room with role, CustomOrderID, and username when connected
      socket.emit('join room', { CustomOrderID: this.customOrderID, role: this.role, username: this.username });

      // Receive messages from the server
      socket.on('chat message', (message) => {
        this.messages.push(message);
      });
    },
    sendMessage() {
      // Check if the message input is not empty
      if (this.messageInput.trim() !== '') {
        // Send message to the server with role, CustomOrderID, username, and message text
        const socket = io('http://localhost:8080');
        socket.emit('chat message', {
          customOrderID: this.customOrderID,
          role: this.role,
          username: this.username,
          message: this.messageInput,
        });

        // Clear the input field
        this.messageInput = '';
      } else {
        // Handle empty message input, display an error message, etc.
        console.error('Invalid message input');
      }
    }
  }
};
</script>

<style scoped>
.message-container {
  height: 300px;
  overflow-y: scroll;
  border: 1px solid #ccc;
  padding: 10px;
}

.message {
  margin: 5px 0;
}

.text-input {
  margin: 10px 0;
  padding: 5px;
  width: 200px;
}

.action-button {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.customer-message {
  color: green;
}

.admin-message {
  color: blue;
}
</style>