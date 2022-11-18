import axios from "axios";

const API_LINK = "/api/posts/";

// get all posts
const getPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_LINK, config);
  return response.data;
};

// get searched user's posts
const searchPosts = async (userName, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    API_LINK + `search/?name=${userName}`,
    config
  );
  return response.data;
};

// get users posts
const userPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_LINK + "user", config);
  return response.data;
};

// create post
const createPost = async (post, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_LINK, post, config);
  return response.data;
};

// delete post
const deletePost = async (postID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_LINK + `${postID}`, config);
  return response.data;
};

// update post
const updatePost = async (postID, post, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_LINK + `${postID}`, post, config);
  return response.data;
};

const postService = {
  getPosts,
  searchPosts,
  userPosts,
  createPost,
  deletePost,
  updatePost,
};

export default postService;
