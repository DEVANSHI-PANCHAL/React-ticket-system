import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

async function registerUser(data) {
    console.log('api')
    return axios.post(API_URL + '/users/register', data)
}

async function signin(data) {
    return await axios.post(API_URL + '/users/login', data)
}

export {
    signin, registerUser
}