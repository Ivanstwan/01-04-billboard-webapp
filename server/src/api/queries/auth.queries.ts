import pool from '@/database';

export function checkEmailExist(email) {
  const query = {
    text: 'SELECT * FROM "users" WHERE email = $1',
    values: [email],
  };
  return pool.query(query);
}

export function createUser(email, password) {
  console.log({ email, password }, '[call query]');

  const query = {
    text: 'INSERT INTO "users" (email, pwd) VALUES ($1, $2)',
    values: [email, password],
  };
  console.log(query, '[query]');

  return pool.query(query);
}
