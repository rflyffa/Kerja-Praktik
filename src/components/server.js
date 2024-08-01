const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Koneksi ke database SQL
const db = mysql.createConnection({
  host: 'localhost',  // Sesuaikan dengan host database Anda
  user: 'root',       // Sesuaikan dengan user database Anda
  password: '',       // Sesuaikan dengan password database Anda
  database: 'akun',   // Nama database Anda
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// Endpoint untuk login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Query untuk memeriksa apakah pengguna ada
  const query = 'SELECT * FROM register WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// Menjalankan server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
