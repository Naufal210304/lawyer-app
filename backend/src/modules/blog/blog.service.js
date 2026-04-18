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

  return await blogModel.createBlog({
    author_id,
    category_id,
    title,
    slug,
    type: 'article', // default type
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
    const { title, slug, category_id, status, content, image_url } = data;
    
    // Build dynamic query
    let query = 'UPDATE blogs SET title = ?, slug = ?, category_id = ?, status = ?, content = ?';
    const values = [title, slug, category_id, status, content];
    
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

// GET BLOG COUNT
const getBlogCount = async () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT COUNT(*) as count FROM blogs';
    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results[0]?.count || 0);
    });
  });
};

// GET BLOG CATEGORIES
const getBlogCategories = async () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, name FROM categories ORDER BY name';
    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results || []);
    });
  });
};

// GET SUGGESTED BLOGS
const getSuggestedBlogs = async (keyword = null) => {
  return new Promise((resolve, reject) => {
    let query;
    let params = [];

    if (keyword) {
      // If keyword provided, find relevant blogs with enhanced matching
      query = `
        SELECT DISTINCT blogs.*, users.username as author_name, categories.name as category_name 
        FROM blogs 
        LEFT JOIN users ON blogs.author_id = users.id 
        LEFT JOIN categories ON blogs.category_id = categories.id 
        LEFT JOIN practice_areas ON (
          practice_areas.title LIKE ? 
          OR practice_areas.description LIKE ? 
          OR practice_areas.detail LIKE ?
        )
        WHERE blogs.status = 'published' 
        AND (
          blogs.title LIKE ? 
          OR blogs.content LIKE ? 
          OR categories.name LIKE ?
          OR practice_areas.title LIKE ?
          OR practice_areas.description LIKE ?
          OR practice_areas.detail LIKE ?
        )
        ORDER BY 
          CASE 
            WHEN blogs.title LIKE ? THEN 1
            WHEN blogs.content LIKE ? THEN 2
            WHEN categories.name LIKE ? THEN 3
            ELSE 4
          END,
          blogs.created_at DESC
        LIMIT 9
      `;
      const searchTerm = `%${keyword}%`;
      params = [
        searchTerm, searchTerm, searchTerm, // for practice_areas join
        searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, // for WHERE
        searchTerm, searchTerm, searchTerm // for ORDER BY
      ];
    } else {
      // Random suggest
      query = `
        SELECT blogs.*, users.username as author_name, categories.name as category_name 
        FROM blogs 
        LEFT JOIN users ON blogs.author_id = users.id 
        LEFT JOIN categories ON blogs.category_id = categories.id 
        WHERE blogs.status = 'published' 
        ORDER BY RAND()
        LIMIT 9
      `;
    }

    console.log('Query:', query);
    console.log('Params:', params);

    db.query(query, params, (err, results) => {
      if (err) {
        console.error('Query error:', err);
        return reject(err);
      }
      console.log('Results:', results.length);
      resolve(results);
    });
  });
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  updateBlogStatus,
  deleteBlog,
  getBlogCount,
  getBlogCategories,
  getSuggestedBlogs
};