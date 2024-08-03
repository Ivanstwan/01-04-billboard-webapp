import pool from '@/database';

export function checkEmailExist(email) {
    const query = {
        text: 'SELECT * FROM "users" WHERE email = $1',
        values: [email],
    };
    return pool.query(query);
}

export function createUser(email, password) {
    const query = {
        text: 'INSERT INTO "users" (email, pwd) VALUES ($1, $2)',
        values: [email, password],
    };
    return pool.query(query);
}
