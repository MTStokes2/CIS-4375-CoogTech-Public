<template>
  <div class="chat-container">
    <div id="chat" ref="messageContainer" class="message-container">
      <div v-for="(message, index) in messages" :key="index" class="message"
        :class="{ 'customer-message': message.role === 'customer', 'admin-message': message.role === 'admin' }">
        <div class="message-header">
          <span class="username"
            :class="{ 'admin-username': message.role === 'admin', 'customer-username': message.role === 'customer' }">{{
              message.username }}</span>
          <span class="timestamp">{{ formatTimestamp(message.createdAt) }}</span>
        </div>
        <div class="message-content">{{ message.message }}</div>
      </div>
      <div ref="lastMessage"></div>
    </div>
    <div class="input-container">
      <input v-model="messageInput" placeholder="Type your message..." class="text-input"
        @keydown.enter.prevent="sendMessage" />
        <div class="button-wrap">
        <label class="button" for="upload">Upload File</label>
        <input id="upload" type="file">
      </div>
      <button @click="sendMessage" class="send-button">Send</button>
    </div>
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
  updated() {
    this.scrollToBottom();
  },
  methods: {
    setupSocketConnection() {
      const socket = io('http://localhost:8080');

      // Join the room with role, CustomOrderID, and username when connected
      socket.emit('join room', { CustomOrderID: this.customOrderID, role: this.role, username: this.username });

      // Receive messages from the server
      socket.on('chat message', (message) => {
        // Check if the received message is not empty
        if (message !== '') {
          this.messages.push(message);
        }
      });

      // Fetch chat history after connecting to the socket
      this.fetchChatHistory();
      this.scrollToBottom();
    },
    async fetchChatHistory() {
      try {
        const response = await fetch(`http://localhost:8080/chat-history/${this.customOrderID}`);
        const data = await response.json();
        console.log('Received chat history data:', data);

        // Format the data received from the API to match the message structure
        this.messages = data.map((message) => {
          let role = 'customer'; // Default role is customer
          let username = ''; // Initialize username variable

          if (message.CustomerMessages) {
            // If there are customer messages, set the role to customer and extract customer username
            role = 'customer';
            if (message.CUSTOMER && message.CUSTOMER.USERNAME && message.CUSTOMER.USERNAME.Username) {
              username = message.CUSTOMER.USERNAME.Username;
            }
          } else if (message.AdminMessages) {
            // If there are admin messages, set the role to admin and extract admin username
            role = 'admin';
            if (message.ADMIN && message.ADMIN.USERNAME && message.ADMIN.USERNAME.Username) {
              username = message.ADMIN.USERNAME.Username;
            }
          }

          return {
            username: username || role.charAt(0).toUpperCase() + role.slice(1), // Use extracted username if available, otherwise set based on role
            role: role, // Set the role based on the message type (customer or admin)
            message: message.CustomerMessages || message.AdminMessages, // Extract the message content from the API response
            createdAt: message.createdAt, // Extract the message timestamp from the API response
          };
        });
        this.scrollToBottom();
      } catch (error) {
        console.error('Error fetching chat history:', error);
        // Handle errors
      }
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

        this.$nextTick(() => {
          // Scroll to bottom
          this.scrollToBottom();
        });

      } else {
        // Handle empty message input, display an error message, etc.
        console.error('Invalid message input');
      }
    },
    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messageContainer;
        const lastMessage = this.$refs.lastMessage;
        container.scrollTop = lastMessage.offsetTop;
      });
    },
  }
};
</script>

<style scoped>
.chat-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.message-container {
  max-height: 300px;
  overflow-y: auto;
  margin-top: 10px;
}

.message {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.username {
  font-weight: bold;
}

.admin-username {
  color: blue;
  /* Set color for admin username */
}

.customer-username {
  color: green;
  /* Set color for customer username */
}

.timestamp {
  color: #888888;
  font-size: 0.8em;
}

.message-content {
  word-wrap: break-word;
}

.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
}

.text-input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

input[type="file"] {
  position: absolute;
  z-index: -1;
  top: 10px;
  left: 8px;
  font-size: 17px;
  color: #b8b8b8;
}

.button-wrap {
  position: relative;
}
.button {
  height: 40px;
  width: 120px;
  background: #2f2f2f;
  color: #fff;
  box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.4);
  padding: 0 20px; 
  border: none;
  outline: none;
  font-size: 16px;
  border-radius: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.send-button {
  height: 40px;
  width: 90px;
  background: #2f2f2f;
  color: #fff;
  box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.4);
  padding: 0 20px; 
  border: none;
  outline: none;
  font-size: 16px;
  border-radius: 40px;
  cursor: pointer;
  margin-right: 0;
}

.send-button:hover {
  background: #1f1f1f;
}

.button:hover {
  background: #1f1f1f;
}

.message-container {
  scrollbar-width: thin; /* Width of the scrollbar */
  scrollbar-color: #888 #f1f1f1; /* Thumb and track color */
}


</style>
