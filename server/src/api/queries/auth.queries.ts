import pool from '@/database';

export function checkEmailExist(email) {
    const query = {
        text: `SELECT * FROM users WHERE email = $1`,
        values: [email],
    };
    return pool.query(query);
}
