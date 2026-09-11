import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export async function initializeDatabase() {
  console.log('Using file-based product storage for Vercel deployment.');
}

const pool = null;
export default pool;
