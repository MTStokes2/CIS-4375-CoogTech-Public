<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" />
            </div>
            <button class="pink-button" type="submit">Login</button>
        </form>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            username: "",
            password: ""
        };
    },
    methods: {
        login() {
            // Add your login logic here
            // Example: send a request to the server to authenticate the user
            // If authentication is successful, you can perform actions like storing a token
            // or setting user information in Vuex (state management).
            // For now, let's simply log the entered username and password.
            console.log("Username:", this.username);
            console.log("Password:", this.password);

            // Optionally, you can clear the form fields after login.
            this.username = "";
            this.password = "";
        }
    }
};
</script>
  
<style scoped>
.login-container {
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
input[type="password"] {
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