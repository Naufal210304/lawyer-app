const db = require('../../config/db');

const createBlog = (data) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO blogs 
      (author_id, category_id, title, slug, type, content, image_url, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.author_id,
      data.category_id,
      data.title,
      data.slug,
      data.type,
      data.content,
      data.image_url,
      data.status
    ];

    db.query(query, values, (err, result) => {
      if (err) return reject(err);

      resolve({
        id: result.insertId,
        ...data
      });
    });
  });
};

const getBlogs = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT blogs.*, users.username as author_name, categories.name as category_name 
      FROM blogs 
      LEFT JOIN users ON blogs.author_id = users.id 
      LEFT JOIN categories ON blogs.category_id = categories.id 
      ORDER BY blogs.created_at DESC
    `;

    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  createBlog,
  getBlogs
};