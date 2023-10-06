<template>
  <div class="signup-container">
    <h2>Sign Up</h2>
    <form @submit.prevent="signUp">
      <div class="form-group">
        <label for="firstname">First Name:</label>
        <input type="text" id="firstname" v-model="firstname" />
      </div>
      <div class="form-group">
        <label for="lastname">Last Name:</label>
        <input type="text" id="lastname" v-model="lastname" />
      </div>
      <div class="form-group">
        <label for="email">Email Address:</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <button class="pink-button" type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
    };
  },
  methods: {
    signUp() {
      // Add your sign-up logic here
      // Example: send a request to the server to create a new user
      // You can handle the sign-up process here without redirection
      alert("Sign-up successful!");
      // Optionally, you can reset the form fields here if needed
      this.firstname = "";
      this.lastname = "";
      this.email = "";
    },
  },
};
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
input[type="email"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button.pink-button {
  background-color: #ff6b81;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
}
</style>