import api from "@/routes/api"

//for front
export default {
    register (user_cred) {
        return api().post('register', user_cred)
    }
}


// example call
// routes.register({
//     email: "test@test.com",
//     password: 'test123',
//     username: 'testing'
// })