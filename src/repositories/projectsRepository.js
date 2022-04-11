const { Op } = require("sequelize");
const { projects } = require("../database/models");

const projectsRepository = {
  getAll: async function (page, size) {
    const list = await projects.findAndCountAll({
      attributes: { exclude: ["deletedAt"] },
      include: {
        association: "Contributor",
        attributes: { exclude: ["deletedAt"] },
      },
      limit: size,
      offset: page * size,
    });
    return list;
  },
  findByPk: async function (id) {
    const project = await projects.findByPk(id, {
      attributes: { exclude: ["deletedAt"] },
      include: {
        association: "Contributor",
        attributes: { exclude: ["deletedAt"] },
      },
    });

    return project;
  },
  create: async function (body) {
    const project = await projects.create({
      name: body.name.trim(),
      description: body.description.trim(),
      status: parseInt(body.status.trim()),
      projectManagerId: parseInt(body.project_manager_id.trim()),
      contributorId: parseInt(body.contributor_id.trim()),
    });
    return project;
  },
  update: async function (id, data) {
    const patch = await projects.update(
      {
        name: data.name.trim(),
        description: data.description.trim(),
        status: parseInt(data.status.trim()),
        projectManagerId: parseInt(data.project_manager_id.trim()),
        contributorId: parseInt(data.contributor_id.trim()),
      },
      {
        where: {
          id,
        },
      }
    );
    const updated = await projects.findByPk(id, {
      attributes: { exclude: ["deletedAt"] },
      include: {
        association: "Contributor",
        attributes: { exclude: ["deletedAt"] },
      },
    });

    return updated;
  },
  destroy: async function (id) {
    const deleted = await projects.destroy({
      where: {
        id,
      },
    });
    return deleted;
  },
  searchProjects: async function (page, size, search) {
    const counted = await projects.findAndCountAll();
    const { count } = counted;
    const results = await projects.findAll(search);
    const response = { count, results };

    return response;
  },
};

module.exports = projectsRepository;
