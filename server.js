/* eslint-disable linebreak-style */
/* eslint-disable spaced-comment */
/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
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

const express = require('express'); // Framework Express
const bodyParser = require('body-parser'); // Middleware untuk parsing body request
const mysql = require('mysql'); // Library MySQL
const cors = require('cors'); // Middleware untuk mengaktifkan CORS

// Konfigurasi aplikasi
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

/********************************************************************
 *                                                                  *
 *         // Existing login database connection                    *
 *                                                                  *
 ********************************************************************/

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

/********************************************************************
 *                                                                  *
 *            // Database connection for surat                      *
 *                                                                  *
 ********************************************************************/
const suratDb = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'surat'
});

suratDb.connect((err) => {
  if (err) {
    console.error('Error connecting to the surat database:', err);
    return;
  }
  console.log('Connected to the surat database.');
});

/*******************************************************
 *                                                     *
 *               DATABASE CONNECTION                   *
 *                                                     *
 *******************************************************/

app.post('/komentar_admin', (req, res) => {
  const { komentar, surat_id } = req.body;

  suratDb.query(
    'INSERT INTO komentar_admin (komentar, surat_id) VALUES (?, ?)',
    [komentar, surat_id],
    (error, results) => {
      if (error) {
        console.error('Error menambahkan komentar:', error);
        res.status(500).json({ error: 'Gagal menambahkan komentar' });
        return;
      }
      res.json({ id: results.insertId, komentar, surat_id });
    }
  );
});

/*******************************************************
 *                                                     *
 *         CURD route to surat ketua data         *
 *                                                     *
 *******************************************************/

app.post('/createsuratketua', (req, res) => {
  const { pembuat, nomor, kepada, untuk, tanggal, jam, tempat } = req.body;

  const query = 'INSERT INTO surat_tugas (pembuat, nomor, kepada, untuk, tanggal, jam, tempat) VALUES (?, ?, ?, ?, ?, ?, ?)';
  suratDb.query(query, [pembuat, nomor, kepada, untuk, tanggal, jam, tempat], (err, result) => {
    if (err) {
      console.error('Error during query execution:', err);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
    res.json({ success: true, message: 'Surat ketua created successfully.' });
  });
});

// GET route to fetch all surat ketua data
app.get('/historysuratketua', (req, res) => {
  const query = 'SELECT * FROM surat_tugas ORDER BY id DESC';
  suratDb.query(query, (err, results) => {
    if (err) {
      console.error('Error during query execution:', err);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
    res.json(results);
  });
});

// GET route to fetch a specific surat ketua by ID
app.get('/historysuratketua/:id', (req, res) => {
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

app.put('/historysuratketua/:id', (req, res) => {
  const { id } = req.params;
  const { pembuat, nomor, kepada, untuk, tanggal, jam, tempat } = req.body;
  const query = 'UPDATE surat_tugas SET pembuat = ?, nomor = ?, kepada = ?, untuk = ?, tanggal = ?, jam = ?, tempat = ? WHERE id = ?';

  suratDb.query(query, [pembuat, nomor, kepada, untuk, tanggal, jam, tempat, id], (err, result) => {
    if (err) {
      console.error('Error during query execution:', err);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'Surat ketua updated successfully.' });
    } else {
      res.status(404).json({ success: false, message: 'Surat not found.' });
    }
  });
});

// DELETE route to delete a surat ketua by ID
app.delete('/historysuratketua/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM surat_tugas WHERE id = ?';
  
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

/*******************************************************
 *                                                     *
 *         CRUD route to surat sekre data              *
 *                                                     *
 *******************************************************/

app.post('/createsuratsekre', (req, res) => {
  const { pembuat, nomor, kepada, untuk, tanggal, jam, tempat } = req.body;

  const query = 'INSERT INTO surat_sekretaris (pembuat, nomor, kepada, untuk, tanggal, jam, tempat) VALUES (?, ?, ?, ?, ?, ?, ?)';
  suratDb.query(query, [pembuat, nomor, kepada, untuk, tanggal, jam, tempat], (err, result) => {
    if (err) {
      console.error('Error during query execution:', err);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
    res.json({ success: true, message: 'Surat sekre created successfully.' });
  });
});

// GET route to fetch all surat ketua data
app.get('/historysuratsekre', (req, res) => {
  const query = 'SELECT * FROM surat_sekretaris ORDER BY id DESC';
  suratDb.query(query, (err, results) => {
    if (err) {
      console.error('Error during query execution:', err);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
    res.json(results);
  });
});

// GET route to fetch a specific surat ketua by ID
app.get('/historysuratsekre/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM surat_sekretaris WHERE id = ?';
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

// PUT route to update a surat ketua by ID
app.put('/historysuratsekre/:id', (req, res) => {
  const { id } = req.params;
  const { pembuat, nomor, kepada, untuk, jam, tanggal, tempat } = req.body;
  const query = 'UPDATE surat_sekretaris SET pembuat = ?, nomor = ?, kepada = ?, untuk = ?, tanggal = ?, jam = ?, tempat = ? WHERE id = ?';
  
  suratDb.query(query, [pembuat, nomor, kepada, untuk, tanggal, jam, tempat, id], (err, result) => {
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

// DELETE route to delete a surat ketua by ID
app.delete('/historysuratsekre/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM surat_sekretaris WHERE id = ?';
  
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

/*******************************************************
 *                                                     *
 *         POST route to surat visum data              *
 *                                                     *
 *******************************************************/

app.post('/createsuratvisum', (req, res) => {
  const { jam, nama, namaPelaksana, hari, tanggal, estimasi } = req.body;

  const query = 'INSERT INTO surat_visum (jam, nama, nama_pelaksana, hari, tanggal, estimasi) VALUES (?, ?, ?, ?, ?, ?)';
  suratDb.query(query, [jam, nama, namaPelaksana, hari, tanggal, estimasi], (err, result) => {
    if (err) {
      console.error('Error during query execution:', err);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
    res.json({ success: true, message: 'Surat visum created successfully.' });
  });
});

// GET route to fetch all surat visum data
app.get('/historysuratvisum', (req, res) => {
  const query = 'SELECT * FROM surat_visum ORDER BY id DESC';
  suratDb.query(query, (err, results) => {
    if (err) {
      console.error('Error during query execution:', err);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
    res.json(results);
  });
});

// GET route to fetch a specific surat visum by ID
app.get('/historysuratvisum/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM surat_visum WHERE id = ?';
  suratDb.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error during query execution:', err);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ success: false, message: 'Surat visum not found.' });
    }
  });
});

// PUT route to update a surat visum by ID
app.put('/historysuratvisum/:id', (req, res) => {
  const { id } = req.params;
  const { jam, nama, namaPelaksana, hari, tanggal, estimasi } = req.body;

  const query = 'UPDATE surat_visum SET jam = ?, nama = ?, nama_pelaksana = ?, hari = ?, tanggal = ?, estimasi = ? WHERE id = ?';
  suratDb.query(query, [jam, nama, namaPelaksana, hari, tanggal, estimasi, id], (err, result) => {
    if (err) {
      console.error('Error during query execution:', err);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'Surat visum updated successfully.' });
    } else {
      res.status(404).json({ success: false, message: 'Surat visum not found.' });
    }
  });
});

// DELETE route to delete a surat visum by ID
app.delete('/historysuratvisum/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM surat_visum WHERE id = ?';
  suratDb.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error during query execution:', err);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'Surat visum deleted successfully.' });
    } else {
      res.status(404).json({ success: false, message: 'Surat visum not found.' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});