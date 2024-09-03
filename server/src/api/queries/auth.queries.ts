import pool from '@/database';

export function checkEmailExist(email: string) {
  const query = {
    text: 'SELECT * FROM "users" WHERE email = $1',
    values: [email],
  };
  return pool.query(query);
}

export function createUser(email: string, password: string) {
  const query = {
    text: 'INSERT INTO "users" (email, pwd) VALUES ($1, $2)',
    values: [email, password],
  };

  return pool.query(query);
}

export function getUserData(id: number) {
  const query = {
    text: 'SELECT id, username, email, img FROM "users" WHERE id = $1',
    values: [id],
  };
  return pool.query(query);
}
