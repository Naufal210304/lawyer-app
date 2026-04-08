import axiosInstance from './axiosInstance';

const BASE_BLOG_URL = '/blogs'; // Asumsi endpoint API untuk blogs adalah /api/blogs

const blogService = {
  /**
   * Mengambil daftar semua blog.
   * @param {object} params - Parameter query opsional (contoh: { page: 1, limit: 10 }).
   * @returns {Promise<Array>} Data daftar blog.
   * @throws {Error} Jika terjadi error saat mengambil data.
   */
  getAllBlogs: async (params = {}) => {
    try {
      const response = await axiosInstance.get(BASE_BLOG_URL, { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching all blogs:", error);
      throw error;
    }
  },

  /**
   * Mengambil detail blog berdasarkan ID atau slug.
   * @param {string | number} idOrSlug - ID atau slug dari blog.
   * @returns {Promise<object>} Data detail blog.
   * @throws {Error} Jika terjadi error saat mengambil data.
   */
  getBlogByIdOrSlug: async (idOrSlug) => {
    try {
      const response = await axiosInstance.get(`${BASE_BLOG_URL}/${idOrSlug}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching blog ${idOrSlug}:`, error);
      throw error;
    }
  },

  /**
   * Membuat blog baru.
   * @param {object | FormData} blogData - Data blog yang akan dibuat. Gunakan FormData jika menyertakan file gambar.
   * @returns {Promise<object>} Data blog yang baru dibuat.
   * @throws {Error} Jika terjadi error saat membuat blog.
   */
  createBlog: async (blogData) => {
    try {
      // Axios secara otomatis mengatur 'Content-Type' menjadi 'multipart/form-data' jika data berupa FormData
      const response = await axiosInstance.post(BASE_BLOG_URL, blogData);
      return response.data;
    } catch (error) {
      console.error("Error creating blog:", error);
      throw error;
    }
  },

  /**
   * Memperbarui blog yang sudah ada.
   * @param {number} id - ID blog yang akan diperbarui.
   * @param {object | FormData} blogData - Data blog yang diperbarui. Gunakan FormData jika memperbarui file gambar.
   * @returns {Promise<object>} Data blog yang telah diperbarui.
   * @throws {Error} Jika terjadi error saat memperbarui blog.
   */
  updateBlog: async (id, blogData) => {
    try {
      const response = await axiosInstance.put(`${BASE_BLOG_URL}/${id}`, blogData);
      return response.data;
    } catch (error) {
      console.error(`Error updating blog ${id}:`, error);
      throw error;
    }
  }
};

export default blogService;
