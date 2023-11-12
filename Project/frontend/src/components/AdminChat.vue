<template>
  <div class="chat-container">
    <!-- Message container loop -->
    <div id="chat" ref="messageContainer" class="message-container">
      <div v-for="(message, index) in messages" :key="index" class="message"
        :class="{ 'customer-message': message.role === 'customer', 'admin-message': message.role === 'admin' }">

        <!-- Render image message -->
        <template v-if="message.imageUrl">
          <div class="message-header" :style="{ backgroundColor: message.role === 'customer' ? '#4caf50' : '#2196F3' }">
            <span class="username"
              :class="{ 'admin-username': message.role === 'admin', 'customer-username': message.role === 'customer' }">
              {{ message.username }}
            </span>
            <span class="timestamp">{{ formatTimestamp(message.createdAt) }}</span>
          </div>
          <div class="message-content">
            <!-- Display image if imageUrl exists -->
            <img :src="message.imageUrl" alt="Image" class="chat-image" />
          </div>
        </template>

        <!-- Render text message -->
        <template v-else>
          <div class="message-header" :style="{ backgroundColor: message.role === 'customer' ? '#4caf50' : '#2196F3' }">
            <span class="username"
              :class="{ 'admin-username': message.role === 'admin', 'customer-username': message.role === 'customer' }">
              {{ message.username }}
            </span>
            <span class="timestamp">{{ formatTimestamp(message.createdAt) }}</span>
          </div>
          <div class="message-content">{{ message.message }}</div>
        </template>
      </div>
      <div ref="lastMessage"></div>
    </div>
    
    <!-- Input container for sending messages -->
    <div class="input-container">
      <input v-model="messageInput" placeholder="Type your message..." class="text-input"
        @keydown.enter.prevent="sendMessage" />
      <!-- File upload button -->
      <div class="button-wrap">
        <label class="button" for="file-upload">Upload File</label>
        <input id="file-upload" type="file" @change="handleFileUpload" style="display: none">
      </div>
      <!-- Send button -->
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
      role: 'admin', // Set the user's role (customer or admin)
      username: 'Admin', // Set the user's username
      customOrderID: '5', // Set the custom order ID
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

      // Receive image messages from the server
      socket.on('image message', (message) => {
        this.messages.push({
          role: message.role,
          username: message.username,
          imageUrl: message.imageUrl, // Store the image URL
          createdAt: message.createdAt,
        });
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
      let imageUrl = null; // Initialize imageUrl variable for images

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

      // Check if the message is a URL ending with an image extension
      const messageText = message.CustomerMessages || message.AdminMessages;
      const imageUrlRegex = /^https:\/\/.*SignedHeaders=host&x-id=GetObject.*$/i;
      if (imageUrlRegex.test(messageText)) {
        imageUrl = messageText;
      }

      return {
        username: username || role.charAt(0).toUpperCase() + role.slice(1), // Use extracted username if available, otherwise set based on role
        role: role, // Set the role based on the message type (customer or admin)
        message: messageText, // Extract the message content from the API response
        createdAt: message.createdAt, // Extract the message timestamp from the API response
        imageUrl: imageUrl, // Set the imageUrl property for images
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
    handleFileUpload(event) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const imageData = reader.result; // Base64 encoded image data
          
          // Emit the image data to the server via Socket.IO
          const socket = io('http://localhost:8080');
          socket.emit('image upload', { image: imageData, customOrderID: this.customOrderID, username: this.username, role: this.role });
        };

        // Read the file as Data URL
        reader.readAsDataURL(file);
      }
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
  padding-right: 10px;
}

.message {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.username {
  font-weight: bold;
  padding: 5px 10px;
}

.timestamp {
  font-size: 0.8em;
  margin-right: 10px;
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

.message-header {
  background-color: rgba(76, 175, 80, 0.2); /* Faded green for customer messages */
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-message .message-header {
  background-color: rgba(33, 150, 243, 0.2); /* Faded blue for admin messages */
}

.chat-image {
  max-width: 100%;
  height: auto;
}

</style>
