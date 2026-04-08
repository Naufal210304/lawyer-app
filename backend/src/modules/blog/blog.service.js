const blogModel = require('./blog.model');
const slugify = require('../../utils/slugify');

// CREATE BLOG
const createBlog = async (data) => {
  let {
    author_id,
    category_id,
    title,
    slug,
    type,
    content,
    image_url,
    status
  } = data;

  // sanitasi
  title = title.trim();

  // auto slug kalau tidak ada
  if (!slug) {
    slug = slugify(title);
  }

  // default value
  if (!status) status = 'draft';
  if (!type) type = 'article';

  return await blogModel.createBlog({
    author_id,
    category_id,
    title,
    slug,
    type,
    content,
    image_url,
    status
  });
};

// GET BLOGS
const getBlogs = async () => {
  return await blogModel.getBlogs();
};

module.exports = {
  createBlog,
  getBlogs
};