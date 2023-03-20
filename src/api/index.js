import axios from 'axios';


//Axios is used to make request to the server as we mentioned the url of server.
//Axios make the given request like axios.get() and axios.patch and all that.
// Further this request is handled by server


const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost); 
export const deletePost=(id)=>axios.delete(`${url}/${id}`);
export const likePost=(id)=>axios.patch(`${url}/${id}/likePost`);
