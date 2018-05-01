const baseUrl =
  `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}` ||
  'http://127.0.0.1:8000';

const urls = {
  login: `${baseUrl}/api/login`,
  register: `${baseUrl}/api/register`,
  getUser: `${baseUrl}/api/user`,
  search: `${baseUrl}/api/food`,
  addComment: `${baseUrl}/api/food/comment`,
  getCategories: `${baseUrl}/api/category`,
  editCategory: `${baseUrl}/api/category`,
  deleteCategory: `${baseUrl}/api/category`,
  addCategory: `${baseUrl}/api/category`,
  addFood: `${baseUrl}/api/food`,
  editFood: `${baseUrl}/api/food`,
  deleteFood: `${baseUrl}/api/food`,
  order: `${baseUrl}/api/order`,
  getOrders: `${baseUrl}/api/order`,
};

export default urls;
