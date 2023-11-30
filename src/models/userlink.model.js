import db from '../../db.js';

const UserLink = {
  getOne: async (id) => {
    const { rows } = await db.query(
      'SELECT userlink.*, link.url FROM userlink JOIN link ON userlink.link = link.id WHERE userlink.id = $1;',
      [id]
    );
    return rows[0];
  },

  getOneByAlias: async (alias) => {
    const { rows } = await db.query(
      'SELECT userlink.*, link.url FROM userlink JOIN link ON userlink.link = link.id WHERE alias = $1',
      [alias]
    );
    return rows[0];
  },

  create: async ({ user, link, alias }) => {
    const { rows } = await db.query(
      'INSERT INTO userlink ("user", link, alias) VALUES ($1, $2, $3) RETURNING *',
      [user, link, alias]
    );

    return rows[0];
  },

  update: async (id, alias) => {
    const { rows } = await db.query(
      'UPDATE userlink SET alias = $1 WHERE id = $2 RETURNING *',
      [alias, id]
    );
    return rows[0];
  },

  delete: async (id) => {
    const { rows } = await db.query('DELETE FROM userlink WHERE id = $1', [id]);
    return rows[0];
  },
};
export default UserLink;
