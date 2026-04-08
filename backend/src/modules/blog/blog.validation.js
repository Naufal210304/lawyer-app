// Validasi create blog
const validateCreateBlog = (data) => {
  const { title, content } = data;

  if (!title || title.trim() === '') {
    return 'Title is required';
  }

  if (!content || content.trim() === '') {
    return 'Content is required';
  }

  if (title.length < 5) {
    return 'Title must be at least 5 characters';
  }

  if (content.length < 20) {
    return 'Content must be at least 20 characters';
  }

  return null; // tidak ada error
};

module.exports = {
  validateCreateBlog
};