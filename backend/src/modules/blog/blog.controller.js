const blogService = require("./blog.service");
const { validateCreateBlog } = require("./blog.validation");
const response = require("../../utils/response");

// GET BLOGS
exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await blogService.getBlogs();

    return response.success(res, "Blogs fetched successfully", blogs);

  } catch (error) {
    next(error);
  }
};

// CREATE BLOG
exports.createBlog = async (req, res, next) => {
  try {
    const { title, slug, category_id, type, status, content } = req.body;

    // ambil dari JWT
    const author_id = req.user.id;

    // validasi
    const error = validateCreateBlog(req.body);
    if (error) {
      return response.error(res, error, 400);
    }

    // upload image
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const blog = await blogService.createBlog({
      author_id,
      category_id: category_id || null,
      title,
      slug,
      type,
      content,
      image_url,
      status,
    });

    return response.success(res, "Blog created successfully", blog, 201);

  } catch (error) {
    next(error); // 🔥 ke error middleware
  }
};

// UPDATE BLOG STATUS
exports.updateBlogStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['draft', 'published'].includes(status)) {
      return response.error(res, 'Invalid status', 400);
    }

    const updated = await blogService.updateBlogStatus(id, status);

    if (!updated) {
      return response.error(res, 'Blog not found', 404);
    }

    return response.success(res, 'Blog status updated successfully');

  } catch (error) {
    next(error);
  }
};

// GET BLOG COUNT
exports.getBlogCount = async (req, res, next) => {
  try {
    const count = await blogService.getBlogCount();
    return response.success(res, "Blog count fetched successfully", { count });
  } catch (error) {
    next(error);
  }
};

// GET BLOG CATEGORIES
exports.getBlogCategories = async (req, res, next) => {
  try {
    const categories = await blogService.getBlogCategories();
    return response.success(res, "Blog categories fetched successfully", categories);
  } catch (error) {
    next(error);
  }
};

// GET SUGGESTED BLOGS
exports.getSuggestedBlogs = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    const blogs = await blogService.getSuggestedBlogs(keyword);
    return response.success(res, "Suggested blogs fetched successfully", blogs);
  } catch (error) {
    next(error);
  }
};

// DELETE BLOG
exports.deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await blogService.deleteBlog(id);

    if (!deleted) {
      return response.error(res, 'Blog not found', 404);
    }

    return response.success(res, 'Blog deleted successfully');

  } catch (error) {
    next(error);
  }
};

// GET BLOG BY ID
exports.getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await blogService.getBlogById(id);

    if (!blog) {
      return response.error(res, 'Blog not found', 404);
    }

    return response.success(res, "Blog fetched successfully", blog);

  } catch (error) {
    next(error);
  }
};

// UPDATE BLOG
exports.updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, slug, category_id, type, status, content } = req.body;

    // upload image jika ada
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const updated = await blogService.updateBlog(id, {
      title,
      slug,
      category_id: category_id || null,
      type,
      status,
      content,
      image_url,
    });

    if (!updated) {
      return response.error(res, 'Blog not found', 404);
    }

    return response.success(res, 'Blog updated successfully');

  } catch (error) {
    next(error);
  }
};