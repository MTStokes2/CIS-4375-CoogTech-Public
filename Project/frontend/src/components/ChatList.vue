<template>
    <div class="chat-list">
      <div class="chat-list-title">
        <h2>Conversations</h2>
      </div>
      <ul>
        <li v-for="chat in chats" :key="chat.CustomOrderID" @click="selectChat(chat)">
          <div class="chat-summary">
            <h3>{{ chat.CustomerName }}</h3>
            <p>{{ chat.LastMessage }}</p>
            <small>{{ formatDate(chat.LastMessageTime) }}</small>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  
  <script>
  export default {
    data() {
      return {
        // Mock data simulating fetched chat list
        chats: [
          {
            CustomOrderID: 1,
            LastMessage: 'Hello, I need help with my order.',
            LastMessageTime: '2023-11-05T12:00:00Z',
            CustomerName: 'John Doe',
          },
          // ... more chat objects
        ],
        selectedChat: null,
      };
    },
    methods: {
      selectChat(chat) {
        this.selectedChat = chat;
        this.$emit('chat-selected', chat);
      },
      formatDate(date) {
        return new Date(date).toLocaleString();
      }
    }
  };
  </script>
  
  <style scoped>
.chat-list {
  background-color: #fff;
  border-right: 1px solid #e0e0e0;
  margin-left: 20px;
}

.chat-list-title {
  padding: 15px 10px;
  border-bottom: 1px solid #e0e0e0;
  text-align: center;
  background-color: #f8f9fa;
}

.chat-list-title h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #333;
}
  .chat-list ul {
    list-style: none;
    padding: 0;
  }
  .chat-list li {
    cursor: pointer;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  .chat-list li:hover {
    background-color: #f0f0f0;
  }
  .chat-summary h3 {
    margin: 0;
  }
  .chat-summary p {
    margin: 0;
    color: #666;
  }
  .chat-summary small {
    color: #999;
  }
  </style>
  