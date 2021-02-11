import axios from 'axios';

export const addNewUserService = (newUser) => {
    return axios.post('http://localhost:5000/users/signup', newUser);
};

export const fetchUsersService = () => {
    return axios.get('http://localhost:5000/users', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
};

export const fetchAUsersPosts = (userId) => {
    return axios.get(`http://localhost:5000/posts/${userId}`, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
};