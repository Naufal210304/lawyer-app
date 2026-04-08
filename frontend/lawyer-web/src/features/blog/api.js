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