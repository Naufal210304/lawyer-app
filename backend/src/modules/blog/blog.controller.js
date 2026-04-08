const blogService = require('./blog.service');

exports.createBlog = async (req, res) => {
  try {
    const { title, slug, category_id, type, status, content } = req.body;

    // ambil dari JWT (AMAN)
    const author_id = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const blog = await blogService.createBlog({
      author_id,
      category_id,
      title,
      slug,
      type,
      content,
      image_url,
      status
    });

    res.status(201).json({
      message: 'Blog created successfully',
      data: blog
    });

  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getBlogs();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs' });
  }
};