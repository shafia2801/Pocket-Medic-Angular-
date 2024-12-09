const express = require('express');
const router = express.Router();
const connection = require('./connection');
const bcrypt = require('bcrypt'); // For password hashing and comparison


// Get all students (for example purposes)
router.get('/get', (req, res) => {
    var query = "SELECT * FROM student";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    });
});

// Delete a student by name
router.delete('/student/:name', (req, res) => {
    const studentId = req.params.name;
    var query = "DELETE FROM student WHERE name = ?";
    connection.query(query, [studentId], (err, result) => {
        if (err) {
            console.error('Error deleting data: ', err);
            return res.status(500).send('Error deleting data', err);
        }
        console.log('Data deleted successfully');
        res.status(200).send('Data deleted successfully');
    });
});

// Update a student by name
router.patch('/update', (req, res) => {
    let user = req.body;
    var query = "UPDATE student SET age = ? WHERE name = ?";
    connection.query(query, [user.age, user.name], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "User name not found" });
            }
            return res.status(200).json({ message: "User updated successfully" });
        } else {
            return res.status(500).json({ error: err.message });
        }
    });
});

// Insert a new student
router.post('/use', (req, res) => {
    const use = req.body;
    var query = "INSERT INTO student (name, age) VALUES (?, ?)";
    connection.query(query, [use.name, use.age], (err) => {
        if (err) {
            console.error('Error inserting data: ', err);
            return res.status(500).send('Error inserting data', err);
        } else {
            console.log('Data inserted successfully');
            res.status(200).send('Data inserted successfully');
        }
    });
});

// Register a new user
router.post('/register', (req, res) => {
    const { username, email,  password } = req.body;
    const query = "INSERT INTO register (username,email,password) VALUES (?, ?, ?)";
    connection.query(query, [username, email,  password], (err) => {
      if (err) {
        console.error('Error registering user: ', err);
        return res.status(500).send('Registration failed. Please try again.');
      } else {
        console.log('User registered successfully');
        return res.status(200).send('User registered successfully');
      }
    });
});

// Get all registered users
router.get('/register', (req, res) => {
    var query = "SELECT * FROM register";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });

 });

// Delete a registered user (DELETE request)
router.delete('/register/:email', (req, res) => {
    const email = req.params.email;
    const query = "DELETE FROM register WHERE email = ?";
    connection.query(query, [email], (err, results) => {
        if (!err) {
            return res.status(200).send('User deleted successfully');
        } else {
            return res.status(500).json(err);
        }
    });
});

// Update a registration by username
router.patch('/register/:username', (req, res) => {
    const username = req.params.username;
    const { email, password } = req.body;
    const query = "UPDATE register SET email = ?, password = ? WHERE username = ?";
    connection.query(query, [email, password, username], (err, results) => {
        if (err) {
            console.error('Error updating registration:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully" });
    });
});


// Login user
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM register WHERE email = ?";
    
    connection.query(query, [email], (err, results) => {
      if (err) {
        return res.status(500).send('Server error');
      }
      if (results.length === 0) {
        return res.status(400).send('Email or password is incorrect');
      }
  
      const user = results[0];
      
      // Assuming you have hashed passwords, compare the provided password with the stored hashed password
      if (user.password !== password) {
        return res.status(400).send('Email or password is incorrect');
      }
      
      // Generate a token or session identifier here (simplified version)
     // You need to implement generateToken
      
      return res.status(200).json({ 
        username: user.username

       });
    });
  });
  


  
 
module.exports = router;
