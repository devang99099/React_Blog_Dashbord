import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPost = () => api.get("/posts");
export const deletePost = (id) => api.delete(`/posts/${id}`);
export const addPost = (post) => api.post("/posts", post);
export const updatePost = (id, post) => api.put(`/posts/${id}`, post);
