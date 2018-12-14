import { Pool } from 'pg';

const pool = new Pool();

export default {
  query: (text: string, params: any) => pool.query(text, params)
};
