<template>
  <div class="chat-container">
    <div v-if="!username" class="username-input">
      <input v-model="usernameInput" placeholder="Enter your username" class="text-input" />
      <button @click="setUsername" class="action-button">Set Username</button>
    </div>
    <div v-else class="chat-room">
      <div ref="messageContainer" class="message-container">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <span class="message-username">{{ message.username }}</span>: {{ message.text }}
        </div>
      </div>
      <div class="input-container">
        <input v-model="messageInput" placeholder="Type your message" class="text-input" />
        <button @click="sendMessage" class="action-button">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client';

export default {
  data() {
    return {
      usernameInput: '',
      messageInput: '',
      username: '',
      messages: [],
      socket: null,
    };
  },
  mounted() {
    this.socket = io('http://localhost:8080');

    this.socket.on('message', (message) => {
      this.messages.push(message);
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    });
  },
  methods: {
    setUsername() {
      if (this.usernameInput.trim() === '') return;
      this.username = this.usernameInput;
    },
    sendMessage() {
      if (!this.username || this.messageInput.trim() === '') return;

      const message = {
        username: this.username,
        text: this.messageInput,
      };

      this.socket.emit('message', message);
      this.messageInput = '';
    },
    scrollToBottom() {
      const container = this.$refs.messageContainer;
      container.scrollTop = container.scrollHeight;
    },
  },
};
</script>

<style scoped>
.chat-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.username-input {
  text-align: center; /* Center justify the username input section */
  margin-bottom: 20px; /* Add some margin for spacing */
}

.message-container {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
  padding-right: 20px; /* Add padding to the right to make space for the scrollbar */
}

/* Style the scrollbar for webkit-based browsers (Chrome, Safari) */
.message-container::-webkit-scrollbar {
  width: 12px; /* Width of the scrollbar */
}

/* Handle portion of the scrollbar */
.message-container::-webkit-scrollbar-thumb {
  background-color: #888; /* Color of the scrollbar handle */
  border-radius: 6px; /* Radius of the scrollbar handle */
}

/* Track portion of the scrollbar */
.message-container::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* Color of the scrollbar track */
  border-radius: 6px; /* Radius of the scrollbar track */
}

.message {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  word-wrap: break-word;
}

.message-username {
  font-weight: bold;
  color: rgb(4, 69, 4);
}

.input-container {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
}

.text-input {
  flex: 1;
  padding: 8px;
  margin-right: 8px;
  border: none;
  outline: none;
  font-size: 14px;
}

.action-button {
  background-color: rgb(4, 69, 4); /* Use the custom text color */
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #005700;
}
</style>

