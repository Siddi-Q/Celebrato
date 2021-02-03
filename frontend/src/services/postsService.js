import axios from 'axios';

export const addNewPostService = (newPost) => {
    // return axios.post('/mockApi/posts', newPost);
    return axios.post('http://localhost:5000/posts', newPost, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
}

export const deletePostService = (postId) => {
    // return axios.delete(`/mockApi/posts/${postId}`);
    return axios.delete(`http://localhost:5000/posts/${postId}`, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
}

export const fetchPostsService = () => {
    // return axios.get('/mockApi/posts');
    return axios.get('http://localhost:5000/posts', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
}

export const updatePostService = (post) => {
    const id = post.id;
    delete post.id;

    // return axios.put(`/mockApi/posts/${id}`, post);
    return axios.put(`http://localhost:5000/posts/${id}`, post, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
}