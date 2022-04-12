const { members } = require("../database/models");

const membersRepository = {
  getAll: async function (page, size) {
    const list = await members.findAndCountAll({
      attributes: { exclude: ["deletedAt"] },
      limit: size,
      offset: page * size,
    });
    return list;
  },
  create: async function (body) {
    const member = await members.create({
      name: body.name.trim(),
      email: body.email.trim(),
    });
    return member;
  },
  update: async function (id, data) {
    const patch = await members.update(
      {
        name: data.name.trim(),
        email: data.email.trim()
      },
      {
        where: {
          id,
        },
      }
    );
    const updated = await members.findByPk(id, {
      attributes: { exclude: ["deletedAt"] },
    });

    return updated;
  },
  destroy: async function (id) {
    const deleted = await members.destroy({
      where: {
        id,
      },
    });
    return deleted;
  },
};

module.exports = membersRepository;
