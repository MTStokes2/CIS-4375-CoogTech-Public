<template>
  <div>
    <div id="chat" ref="messageContainer" class="message-container">
      <div v-for="(message, index) in messages" :key="index" class="message">
        {{ message.username }}: {{ message.text }}
      </div>
    </div>
    <input v-model="usernameInput" placeholder="Enter your username..." class="text-input" />
    <input v-model="customOrderID" placeholder="Enter custom order ID..." class="text-input" />
    <input v-model="messageInput" placeholder="Type your message..." class="text-input" />
    <button @click="setUsername" class="action-button">Set Username</button>
    <button @click="sendMessage" class="action-button">Send</button>
  </div>
</template>

<script>
import { io } from 'socket.io-client';
import axios from 'axios';

export default {
  data() {
    return {
      socket: null,
      messages: [],
      usernameInput: '',
      customOrderID: '',
      messageInput: '',
    };
  },
  mounted() {
    this.socket = io('http://localhost:8080');
    this.socket.on('message', (message) => {
      this.messages.push(message);
      this.scrollChatToBottom();
    });
  },
  methods: {
    async setUsername() {
      if (this.usernameInput.trim() !== '' && this.customOrderID.trim() !== '') {
        this.socket.emit('join', this.usernameInput, 'customer', this.customOrderID);

        try {
          const response = await axios.get(`http://localhost:8080/Chat/History/${this.customOrderID}`);
          this.messages = response.data.map(chat => ({
            username: chat.CustomerID,
            text: chat.CustomerMessages,
          }));
          
          this.scrollChatToBottom();
        } catch (error) {
          console.error('Error fetching chat history:', error);
        }
      } else {
        alert('Please enter username and custom order ID.');
      }
    },
    sendMessage() {
      if (this.usernameInput && this.customOrderID && this.messageInput) {
        const newMessage = {
          username: this.usernameInput,
          text: this.messageInput,
        };

        // Emit the new message to the server
        this.socket.emit('message', {
          Username: this.usernameInput,
          CustomOrderID: this.customOrderID,
          message: this.messageInput,
        });

        // Add a new copy of the message to the chat history
        this.messages.push({ ...newMessage }); // Create a copy of the object

        // Clear the message input field
        this.messageInput = null;

        // Scroll to the bottom to show the new message
        this.scrollChatToBottom();
      } else {
        alert('Please enter username, custom order ID, and message.');
      }
    },
    scrollChatToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messageContainer;
        container.scrollTop = container.scrollHeight;
      });
    },
  },
  };
</script>

<style scoped>
.message-container {
  height: 300px;
  overflow-y: scroll;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
}

.message {
  margin-bottom: 10px;
}

.text-input {
  width: 200px;
  padding: 8px;
  margin-right: 10px;
}

.action-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-right: 10px;
}
</style>
