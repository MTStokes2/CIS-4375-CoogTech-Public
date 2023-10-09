import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: 'http://localhost:3000/'//currently set to localhost not database
    })
}