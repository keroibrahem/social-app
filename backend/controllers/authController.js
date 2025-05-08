// const User = require('../models/user');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// exports.registerUser = async (req, res) => {
//     const {first_name , last_name, email, password ,gender  } = req.body;
//     try {
//       const existing = await User.findOne({ email });
//       if (existing) return res.status(400).json({ msg: 'Email already exists' });

//       const hashed = await bcrypt.hash(password, 10);
//       const user = await User.create({ first_name , last_name, email, password: hashed ,gender });

//       res.status(201).json({ msg: 'User created successfully' });
//     } catch (err) {
//       res.status(500).json({ msg: 'Error registering user' });
//     }
//   };

//   exports.loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//       const user = await User.findOne({ email });
//       if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//       res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
//     } catch (err) {
//       res.status(500).json({ msg: 'Error logging in' });
//     }
//   };
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await db.execute("SELECT * FROM users");
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve users." });
  }
};
exports.getUsersById = async (req, res) => {
  const userId = req.params.id;
  
  try {
    const [user] = await db.execute("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    console.log(user[0]);

    if (user.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve user." });
  }
};

exports.registerUser = async (req, res) => {
  const { first_name, last_name, email, password, gender } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute(
      "INSERT INTO users (first_name, last_name, email, password, gender) VALUES (?, ?, ?, ?, ?)",
      [first_name, last_name, email, hashedPassword, gender]
    );

    res.status(201).json({ message: "User registered successfully!" });
    console.log("User registered successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed." });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log("Request Body:", req.body);
  // console.log("Email:", email);
  // console.log("Password:", password);
  try {
    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    // console.log(users);

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const validPassword = await bcrypt.compare(password, users[0].PASSWORD);
    // console.log("Valid Password:", validPassword);
    // console.log("User Data:", users);
    // console.log("Password from DB:", users[0].PASSWORD);
    // console.log("Password from Request:", password);
    // if (users[0].password === password) {
    //   console.log("Password match!");
    // } else {
    //   console.log("Password does not match.");
    // }

    if (!validPassword) {
      return res.status(400).json({ error: "Invalid credentials." });
    }
    await db.execute("UPDATE users SET isOnline = ? WHERE id = ?", [1, users[0].id]);
    
    const token = jwt.sign({ id: users[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user: users[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed." });
  }
};


exports.updateUser = async (req, res) => {
  const userId = req.params.id; // الحصول على معرف المستخدم من المسار
  const { first_name, last_name, email, profilePic, bio, gender } = req.body; // البيانات المرسلة من العميل

  try {
    const [oldProfilePic] = await db.execute("SELECT profilePic FROM users WHERE id = ?", [userId]);
    if (oldProfilePic[0].profilePic !== profilePic) {
      await deleteImage(oldProfilePic[0].profilePic);
    }
    // تحديث بيانات المستخدم في قاعدة البيانات
    const [result] = await db.execute(
      "UPDATE users SET first_name = ?, last_name = ?, email = ?, profilePic = ?, bio = ?, gender = ? WHERE id = ?",
      [first_name, last_name, email, profilePic, bio, gender, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "User updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user." });
  }
};

exports.logoutUser = async (req, res) => {
  const userId = req.params.id; // الحصول على معرف المستخدم من المسار

  try {
    // تحديث isOnline إلى 0 في قاعدة البيانات
    const [result] = await db.execute("UPDATE users SET isOnline = ? WHERE id = ?", [0, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "User logged out successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to log out user." });
  }
};