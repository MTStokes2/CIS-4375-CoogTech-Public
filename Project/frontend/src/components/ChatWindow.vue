<template>
    <div v-if="selectedChat" class="chat-window">
      <header class="chat-header">
        <h2>Chat with {{ selectedChat.CustomerName }}</h2>
      </header>
      <div class="messages">
        <!-- Messages will be rendered here -->
      </div>
      <footer class="chat-footer">
        <input type="text" placeholder="Type a message..." v-model="newMessage">
        <button @click="sendMessage">Send</button>
      </footer>
    </div>
    <div v-else class="no-chat-selected">
      <p>Select a chat to view messages</p>
    </div>
  </template>
  
  
  <script>
  export default {
    props: ['selectedChat'],
    data() {
      return {
        newMessage: '',
        messages: [], // This will hold the chat messages
      };
    },
    methods: {
      sendMessage() {
        // Placeholder for send message functionality
        console.log('Sending message:', this.newMessage);
        this.newMessage = ''; // Clear input after sending
      }
    }
  };
  </script>
  
  <style scoped>
  .chat-window {
    display: flex;
    flex-direction: column;
    height: 100%;
    border-left: 1px solid #e0e0e0;
    
  }
  
  .chat-header {
    padding: 15px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #e0e0e0;
    text-align: center;
  }
  
  .chat-header h2 {
    margin: 0;
    font-size: 1.25rem;
    color: #333;
  }
  
  .messages {
    flex-grow: 1;
    overflow-y: auto;
    padding: 15px;
    background-color: #fff;
  }
  
  .chat-footer {
    padding: 10px;
    background-color: #f8f9fa;
    border-top: 1px solid #e0e0e0;
  }
  
  .chat-footer input {
    width: 100%;
    padding: 10px;
    margin-right: 5px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .chat-footer button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .chat-footer button:hover {
    background-color: #0056b3;
  }
  
  .no-chat-selected {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #999;
  }
  
  /* Additional responsive design and other stylings... */
  </style>
  
  