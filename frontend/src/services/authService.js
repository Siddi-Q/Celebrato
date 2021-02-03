import axios from 'axios';

export const loginService = loginCred => {
    return axios.post('http://localhost:5000/users/login', loginCred);
};

export const logoutService = () => {
    return axios.post('http://localhost:5000/users/logout', null, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
};