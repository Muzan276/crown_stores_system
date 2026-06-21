const db = require('../config/db');

const createUser = async (fullName, username, hashedPassword, role) => {
  const [result] = await db.query(
    'INSERT INTO users (full_name, username, password, role) VALUES (?, ?, ?, ?)',
    [fullName, username, hashedPassword, role]
  );
  return result.insertId;
};

const findUserByUsername = async (username) => {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );
  return rows[0];
};

module.exports = { createUser, findUserByUsername };