const blogModel = require('./blog.model');
const slugify = require('../../utils/slugify');
const db = require('../../config/db');

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

// GET BLOG BY ID
const getBlogById = async (id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT blogs.*, users.username as author_name, categories.name as category_name 
      FROM blogs 
      LEFT JOIN users ON blogs.author_id = users.id 
      LEFT JOIN categories ON blogs.category_id = categories.id 
      WHERE blogs.id = ?
    `;
    db.query(query, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

// UPDATE BLOG
const updateBlog = async (id, data) => {
  return new Promise((resolve, reject) => {
    const { title, slug, category_id, type, status, content, image_url } = data;
    
    // Build dynamic query
    let query = 'UPDATE blogs SET title = ?, slug = ?, category_id = ?, type = ?, status = ?, content = ?';
    const values = [title, slug, category_id, type, status, content];
    
    if (image_url) {
      query += ', image_url = ?';
      values.push(image_url);
    }
    
    query += ' WHERE id = ?';
    values.push(id);

    db.query(query, values, (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows > 0);
    });
  });
};

// DELETE BLOG
const deleteBlog = async (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM blogs WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows > 0);
    });
  });
};

// UPDATE BLOG STATUS
const updateBlogStatus = async (id, status) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE blogs SET status = ? WHERE id = ?';
    db.query(query, [status, id], (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows > 0);
    });
  });
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  updateBlogStatus,
  deleteBlog
};