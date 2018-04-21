const baseUrl =
  `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}` ||
  'http://127.0.0.1:8000';

const urls = {
  login: `${baseUrl}/api/login`,
  register: `${baseUrl}/api/register`,
  getUser: `${baseUrl}/api/user`,
  search: `${baseUrl}/api/food`,
  addComment: `${baseUrl}/api/food/comment`,
};

export default urls;
