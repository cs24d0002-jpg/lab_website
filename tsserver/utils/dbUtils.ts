import { QueryResultRow } from 'pg';
import pool from '../config/db';

/**
 * Executes a parameterized SQL query asynchronously with generic return typing.
 * @template T Type representing the row structure
 * @param text The SQL query string
 * @param params Parameter array ($1, $2, etc.)
 */
export const executeQuery = async <T extends QueryResultRow = any>(
  text: string,
  params: any[] = []
): Promise<T[]> => {
  const start = Date.now();
  try {
    const res = await pool.query<T>(text, params);
    const duration = Date.now() - start;
    console.log(`Executed query in ${duration}ms:`);
    return res.rows;
  } catch (error: any) {
    console.error('Database Query Error:', {
      query: text,
      params,
      message: error.message,
    });
    throw error;
  }
};