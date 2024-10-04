const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;
const where = db.Sequelize.where;
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config');
const { OAuth2Client } = require('google-auth-library');
const { Pool } = require('pg');
const dbConfig = require('../config/db.config');

// Create a connection pool
const pool = new Pool({
  user: dbConfig.USER,
  host: dbConfig.HOST,
  database: dbConfig.DB,
  password: dbConfig.PASSWORD,
  port: 5432,
});

async function findUserByEamil(email) {
  try {
    users = await User.findAll({ where: { email: email } });
    return (users instanceof Array) ? users[0] : null;
  } catch (ex) {
    throw ex;
  }
}

// Get user, role, and permissions by user ID
async function getUserRolePermissions(userId, res) {
  try {
    const query = `
            SELECT 
                u.id AS user_id,
                u.username AS user_name,
                u.email AS user_email,
                r.id AS role_id,
                r.name AS role_name,
                p.id AS permission_id,
                p.name AS permission_name
            FROM 
                users u
            JOIN 
                roles r ON u.role_id = r.id
            JOIN 
                role_permission rp ON r.id = rp.role_id
            JOIN 
                permissions p ON rp.permission_id = p.id
            WHERE 
                u.id = $1
        `;
    const result = await pool.query(query, [userId]);

    const current_user = { ...result.rows[0], permissions: [] };
    for (let i in result.rows) {
      current_user.permissions.push({ id: result.rows[i].permission_id, name: result.rows[i].permission_name });
    }

    console.log(current_user);

    return res.json({
      user: current_user,
      message: 'Login Successful',
      token: jwt.sign({ username: current_user.user_name, email: current_user.user_email }, secret),
    }); // Return the full result
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.signup = (req, res) => {

  if (!req.body.fullname, !req.body.email, !req.body.password) {
    res.status(400).send({
      message: 'Please provide all the fields.',
    });
    return;
  }
  let role_id = req.body.role_id;
  if (!role_id) {
    role_id = 4;
  }

  // Create the User Record
  const newUser = {
    username: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    role_id: role_id,
  };

  User.create(newUser)
    .then(data => {
      res.send({
        message: 'Signup Successful!',
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while signing you up.',
        errObj: err,
      });
    });
};

exports.login = async (req, res) => {

  if ((!req.body.username && !req.body.email) || (!req.body.password)) {
    res.status(400).send({
      message: 'Please provide username/email and password.',
    });
  }

  user = null;
  if (req.body.email) {

    user = await findUserByEamil(req.body.email);
  }

  if (user == null || !(user instanceof User)) {
    res.status(403).send({
      message: 'Invalid Credentials!',
    });
  } else {
    if (user.verifyPassword(req.body.password)) {
      const id = user.id;

      await getUserRolePermissions(id, res);

    } else {
      res.status(403).send({
        message: 'Wrong Password',
      });
    }
  }
};

exports.changepassword = async (req, res) => {
  console.log(req.body);

  if (!req.body.oldpassword || !req.body.newpassword) {
    res.status(400).send({
      message: 'Please provide both old and new password.',
    });
  }
  user = await findUserByEamil(req.user.email);
  if (user == null || !(user instanceof User)) {
    res.status(403).send({
      message: 'Invalid Credentials!',
    });
  } else {
    if (user.verifyPassword(req.body.oldpassword)) {
      user.update({ password: req.body.newpassword }, {
        where: { id: user.id },
      });
      res.status(200).send({
        message: 'Password Updated Successfully!',
      });
    } else {
      res.status(403).send({
        message: 'Invalid Old Password! Please recheck.',
      });
    }
  }
};

exports.verifypassword = async (req, res) => {
  console.log(req.body);

  if (!req.body.password) {
    res.status(400).send({
      message: 'Please provide your password to re-authenticate.',
    });
  }
  user = await findUserByUsername(req.user.username);
  if (user == null || !(user instanceof User)) {
    res.status(403).send({
      message: 'Invalid Credentials!',
    });
  } else {
    if (user.verifyPassword(req.body.password)) {
      res.status(200).send({
        message: 'Password Verification Successful!',
      });
    } else {
      res.status(403).send({
        message: 'Invalid Password! Please recheck.',
      });
    }
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();

  const users_detail = [];
  for (let i in users) {

    const query = `
            SELECT 
                u.id AS user_id,
                u.username AS user_name,
                u.email AS user_email,
                r.id AS role_id,
                r.name AS role_name,
                p.id AS permission_id,
                p.name AS permission_name
            FROM 
                users u
            JOIN 
                roles r ON u.role_id = r.id
            JOIN 
                role_permission rp ON r.id = rp.role_id
            JOIN 
                permissions p ON rp.permission_id = p.id
            WHERE 
                u.id = $1
        `;
    const result = await pool.query(query, [users[i].id]);

    const current_user = { ...result.rows[0], permissions: [] };

    for (let i in result.rows) {
      current_user.permissions.push({ id: result.rows[i].permission_id, name: result.rows[i].permission_name });
    }

    users_detail.push(current_user);
  }
  return res.json({ users: users_detail });
};

exports.googleLogin = async (req, res) => {
  const client = new OAuth2Client('907552871530-ra1if9hnglttlb02jnjvht6df71e9kj2.apps.googleusercontent.com');

  const { token } = req.body;

  try {
    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '907552871530-ra1if9hnglttlb02jnjvht6df71e9kj2.apps.googleusercontent.com', // Specify the CLIENT_ID of the app that accesses the backend
    });

    const payload = ticket.getPayload(); // The user data
    const { sub, email, name, picture } = payload; // Extract info like user ID, email, etc.

    user = await findUserByEamil(email);

    if (user == null || !(user instanceof User)) {
      return res.status(403).send({
        message: 'Invalid Credentials!',
      });
    }

    const id = user.id;
    await getUserRolePermissions(id, res);
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};


module.exports = exports;