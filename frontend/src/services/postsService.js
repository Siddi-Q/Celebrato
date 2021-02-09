import axios from 'axios';

export const addNewPostService = (newPost) => {
    return axios.post('http://localhost:5000/posts', newPost, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
};

export const deletePostService = (postId) => {
    return axios.delete(`http://localhost:5000/posts/${postId}`, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
};

export const fetchPostsService = () => {
    return axios.get('http://localhost:5000/posts/all', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
};

export const updatePostService = (post) => {
    const id = post.id;
    delete post.id;

    return axios.put(`http://localhost:5000/posts/${id}`, post, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
};