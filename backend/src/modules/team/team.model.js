const db = require('../../config/db');

// GET ALL TEAM MEMBERS
const getAllTeamMembers = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM team_members ORDER BY order_index ASC';

    console.log('Model: Running query for getAllTeamMembers');
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database error fetching team members:', err);
        return reject(err);
      }

      console.log('Model: Retrieved team members count:', results.length);
      resolve(results);
    });
  });
};

// GET TEAM MEMBER BY ID
const getTeamMemberById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM team_members WHERE id = ?';

    db.query(query, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

// CREATE TEAM MEMBER
const createTeamMember = (memberData) => {
  return new Promise((resolve, reject) => {
    const { name, position, image_url, linkedin_url, order_index } = memberData;

    const query = `
      INSERT INTO team_members (name, position, image_url, linkedin_url, order_index)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [name, position, image_url, linkedin_url || null, order_index || 0], (err, result) => {
      if (err) {
        console.error('Database error inserting team member:', err);
        return reject(err);
      }

      resolve({
        id: result.insertId,
        name,
        position,
        image_url,
        linkedin_url,
        order_index: order_index || 0
      });
    });
  });
};

// UPDATE TEAM MEMBER
const updateTeamMember = (id, memberData) => {
  return new Promise((resolve, reject) => {
    const { name, position, image_url, linkedin_url, order_index } = memberData;

    const query = `
      UPDATE team_members
      SET name = ?, position = ?, image_url = ?, linkedin_url = ?, order_index = ?
      WHERE id = ?
    `;

    db.query(query, [name, position, image_url, linkedin_url || null, order_index || 0, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// DELETE TEAM MEMBER
const deleteTeamMember = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM team_members WHERE id = ?';

    db.query(query, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// GET TEAM MEMBERS COUNT
const getTeamMembersCount = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT COUNT(*) as count FROM team_members';

    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results[0]?.count || 0);
    });
  });
};

module.exports = {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getTeamMembersCount
};