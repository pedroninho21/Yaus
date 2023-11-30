import UserLink from '../models/userlink.model.js';
import Link from '../models/link.model.js';

const UserLinkController = {
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const userlink = await UserLink.getOne(id);
      res.json(userlink);
    } catch (error) {
      next(error);
    }
  },

  getOneByAlias: async (req, res, next) => {
    try {
      const { alias } = req.params;
      const userlink = await UserLink.getOneByAlias(alias);
      if (userlink) {
        res.json(userlink);
      } else {
        res.status(404).json({ error: 'Link not found' });
      }
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { url, alias } = req.body;

      const link = await Link.getOneByUrl(url);
      if (!link) {
        const newLink = await Link.create(url);
        const userLink = await UserLink.create({
          user: req.user?.id || null,
          link: newLink.id,
          alias,
        });
        res.json(userLink);
      } else {
        const userLink = await UserLink.create({
          user: req.user?.id || null,
          link: link.id,
          alias,
        });
        res.json(userLink);
      }
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { alias } = req.body;

      const userLink = await UserLink.getOne(id);
      if (!userLink) {
        return res.status(404).json({ error: 'Link not found' });
      }
      if (userLink.user !== req.user.id) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      const updatedUserLink = await UserLink.update(id, alias);
      res.json(updatedUserLink);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const userLink = await UserLink.getOne(id);
      if (!userLink) {
        return res.status(404).json({ error: 'Link not found' });
      }
      if (userLink.user !== req.user.id) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      const deletedUserLink = await UserLink.delete(id);
      res.json(deletedUserLink);
    } catch (error) {
      next(error);
    }
  },
};
export default UserLinkController;
