const { Pool } = require('pg');
const dbConfig = require("../config/db.config.js");
const db = require('../models');

// Create a connection pool
const pool = new Pool({
  user: dbConfig.USER,
  host: dbConfig.HOST,
  database: dbConfig.DB,
  password: dbConfig.PASSWORD,
  port: 5432,
});

// Get all permissions
exports.getPermissions = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM permissions');
    res.json({permissions: result.rows});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get permission by ID
exports.getPermissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM permissions WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new permission
exports.createPermission = async (req, res) => {
  try {
    const { name } = req.body;
    Permission = db.permission;
    Permission.create({name: name})
      .then(data => {
        res.status(201).send(data);
      })
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a permission
exports.updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await pool.query('UPDATE permissions SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a permission
exports.deletePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM permissions WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    res.json({ message: 'Permission deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};