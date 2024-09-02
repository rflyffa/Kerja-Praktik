/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Existing login database connection
const loginDb = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'login'
});

loginDb.connect((err) => {
  if (err) {
    console.error('Error connecting to the login database:', err);
    return;
  }
  console.log('Connected to the login database.');
});

// New surat_tugas database connection
const suratDb = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'surat_tugas'
});

suratDb.connect((err) => {
  if (err) {
    console.error('Error connecting to the surat_tugas database:', err);
    return;
  }
  console.log('Connected to the surat_tugas database.');
});

// POST route to handle login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  loginDb.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error during query execution:', err);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }

    if (results.length > 0) {
      const user = results[0];
      res.json({ success: true, role: user.role });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }
  });
});

// POST route to save surat data
app.post('/createsuratketua', (req, res) => {
  const { nomor, kepada, untuk, tanggal, tempat } = req.body;

  const query = 'INSERT INTO surat (nomor, kepada, untuk, tanggal, tempat) VALUES (?, ?, ?, ?, ?)';
  suratDb.query(query, [nomor, kepada, untuk, tanggal, tempat], (err, result) => {
    if (err) {
      console.error('Error during query execution:', err);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
    res.json({ success: true, message: 'Surat created successfully.' });
  });
});

// GET route to fetch all surat data
app.get('/history', (req, res) => {
  const query = 'SELECT * FROM surat ORDER BY id DESC';
  suratDb.query(query, (err, results) => {
    if (err) {
      console.error('Error during query execution:', err);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
    res.json(results);
  });
});

// GET route to fetch a specific surat by ID
app.get('/history/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM surat WHERE id = ?';
  suratDb.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error during query execution:', err);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ success: false, message: 'Surat not found.' });
    }
  });
});

// PUT route to update a surat by ID
app.put('/history/:id', (req, res) => {
  const { id } = req.params;
  const { nomor, kepada, untuk, tanggal, tempat } = req.body;
  const query = 'UPDATE surat SET nomor = ?, kepada = ?, untuk = ?, tanggal = ?, tempat = ? WHERE id = ?';
  
  suratDb.query(query, [nomor, kepada, untuk, tanggal, tempat, id], (err, result) => {
    if (err) {
      console.error('Error during query execution:', err);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'Surat updated successfully.' });
    } else {
      res.status(404).json({ success: false, message: 'Surat not found.' });
    }
  });
});

// DELETE route to delete a surat by ID
app.delete('/history/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM surat WHERE id = ?';
  
  suratDb.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error during query execution:', err);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'Surat deleted successfully.' });
    } else {
      res.status(404).json({ success: false, message: 'Surat not found.' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
