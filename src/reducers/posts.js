
//This is where the actual change happpens. 
// Acording to the action happened the reducers update the global state
import { FETCH_ALL, DELETE, UPDATE, LIKE, CREATE } from "../constants/actionTypes";

export default (posts = [], action) => {
    switch (action.type) {

        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        case LIKE:
        case UPDATE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        default:
            return posts;
    }
}