import db from '../../db.js';

const User = {
  getOneByEmail: async (email) => {
    const { rows } = await db.query('SELECT * FROM "user" WHERE email = $1', [
      email,
    ]);
    return rows[0];
  },

  create: async (newUser) => {
    const { name, email, password } = newUser;

    const { rows } = await db.query(
      'INSERT INTO "user" (name, email, password) VALUES ($1, $2, $3) RETURNING name, email',
      [name, email, password]
    );

    return rows[0];
  },
};

export default User;
