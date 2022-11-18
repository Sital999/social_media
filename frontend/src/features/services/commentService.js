import axios from "axios";

const API_LINK = "/api/comments/";

// get comments
const getComments = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_LINK + `${postId}`, config);
  return response.data;
};

// add comments
const addComment = async (postId, body, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const comment = { body };
  const response = await axios.post(API_LINK + `${postId}`, comment, config);
  return response.data;
};
const commentService = {
  getComments,
  addComment,
};

export default commentService;
