import axios from "axios";

const instance = axios.create({
    baseURL: 'https://chatous-backend.herokuapp.com/'
})

export default instance;