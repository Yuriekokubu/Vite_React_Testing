import express from 'express';
import Database from 'better-sqlite3';

// 1. ตรวจสอบโหมดปัจจุบัน (ถ้าไม่มีค่าให้เป็น development)
const isTest = process.env.NODE_ENV === 'test';
const dbFile = isTest ? 'data_test.sqlite' : 'data.sqlite';

console.log(`[Server] Running in ${process.env.NODE_ENV || 'development'} mode`);
console.log(`[Server] Using database: ${dbFile}`);

// 2. เชื่อมต่อ DB ตามโหมด
const db = new Database(dbFile);

// 3. จัดการ Table และ Seed Data (ทำงานเหมือนเดิมแต่แยกไฟล์)
db.prepare('CREATE TABLE IF NOT EXISTS users (user TEXT PRIMARY KEY, pass TEXT)').run();
const insert = db.prepare('INSERT OR IGNORE INTO users (user, pass) VALUES (?, ?)');
insert.run('admin', 'password');

const app = express();
app.use(express.json());

app.post('/login', (req, res) => {
  const { user, pass } = req.body;
  const row = db.prepare('SELECT * FROM users WHERE user = ? AND pass = ?').get(user, pass);
  res.json({ valid: !!row });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Auth server listening on http://localhost:${port}`);
});