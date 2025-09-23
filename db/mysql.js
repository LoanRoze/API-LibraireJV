import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const db = await mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'appuser',
  password: process.env.MYSQL_PASSWORD || 'apppassword',
  database: process.env.MYSQL_DATABASE || 'game_platform',
});

try {
  await db.connect();
  console.log('✅ MySQL connected');
} catch (err) {
  console.error('❌ MySQL connection error:', err);
}