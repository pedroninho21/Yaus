import db from '../../db.js';

const Link = {
  getOneByUrl: async (url) => {
    const { rows } = await db.query('SELECT * FROM link WHERE url = $1', [url]);
    return rows[0];
  },

  create: async (url) => {
    const { rows } = await db.query(
      'INSERT INTO link (url) VALUES ($1) RETURNING *',
      [url]
    );
    return rows[0];
  },
};

export default Link;
