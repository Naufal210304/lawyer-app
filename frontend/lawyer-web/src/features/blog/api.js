import axios from '../../services/axios';

export const fetchBlogs = async () => {
  try {
    const response = await axios.get('/blogs');
    return response.data.data; // asumsikan response.success format
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

export const fetchSuggestedBlogs = async (keyword = null) => {
  try {
    const params = keyword ? { keyword } : {};
    const response = await axios.get('/blogs/suggest', { params });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching suggested blogs:', error);
    throw error;
  }
};

export const fetchBlogCategories = async () => {
  try {
    const response = await axios.get('/blogs/categories');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    throw error;
  }
};