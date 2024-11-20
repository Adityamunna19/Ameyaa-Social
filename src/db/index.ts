import { AppDatabase } from './database';

export const db = new AppDatabase();

// Initialize the database
db.open().catch((err) => {
  console.error('Failed to open database:', err);
});