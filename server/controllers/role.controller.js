const { Pool } = require('pg');
const dbConfig = require("../config/db.config.js");
const db = require("../models");

// Create a connection pool
const pool = new Pool({
  user: dbConfig.USER,
  host: dbConfig.HOST,
  database: dbConfig.DB,
  password: dbConfig.PASSWORD,
  port: 5432,
});

// Get all roles
exports.getRoles = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM roles');
    res.json({roles: result.rows});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get role by ID
exports.getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM roles WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const { name } = req.body;
    Role = db.role;
    Role.create({name: name})
      .then(data => {
        res.status(201).send(data);
      })
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a role
exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await pool.query('UPDATE roles SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a role
exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM roles WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json({ message: 'Role deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addPermissionsToRole = async (req, res) => {
  try {
    const { roleId } = req.params; // The role ID from the URL
    const { permissionIds } = req.body; // Array of permission IDs

    // Check if the role exists
    const roleResult = await pool.query('SELECT * FROM roles WHERE id = $1', [roleId]);
    if (roleResult.rows.length === 0) {
      return res.status(404).json({ error: 'Role not found' });
    }

    // Check if permissions exist
    for (let permissionId of permissionIds) {
      const permissionResult = await pool.query('SELECT * FROM permissions WHERE id = $1', [permissionId]);
      if (permissionResult.rows.length === 0) {
        return res.status(404).json({ error: `Permission with id ${permissionId} not found` });
      }

      // Insert into RolePermission table
      await pool.query('INSERT INTO role_permission (role_id, permission_id) VALUES ($1, $2)', [roleId, permissionId]);
    }

    res.json({ message: 'Permissions added to role successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};


// Get permissions by role ID
exports.getPermissionsByRoleId = async (req, res) => {
  try {
    const { roleId } = req.params; // The role ID from the URL

    // Check if the role exists
    const roleResult = await pool.query('SELECT * FROM roles WHERE id = $1', [roleId]);
    if (roleResult.rows.length === 0) {
      return res.status(404).json({ error: 'Role not found' });
    }

    // Retrieve all permissions associated with the role
    const result = await pool.query(`
            SELECT p.*
            FROM permissions p
            INNER JOIN RolePermission rp ON rp.permission_id = p.id
            WHERE rp.role_id = $1
        `, [roleId]);

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};