const { findByPk, getAll, create, destroy, update, searchProjects } = require("../repositories/projectsRepository");
const { Op } = require("sequelize");

const projectsService = {
  getAllProjects: async (req, res) => {
    let { page, size, prevPage } = req.query;

    const projects = await getAll(page, size);

    try {
      if (projects != undefined) {
        res.status(200).json({
          status: "OK",
          totalPages: Math.ceil(projects.count / size),
          page: page,
          nextPage: page + 1,
          previousPage: prevPage,
          content: projects.rows,
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "Sorry, there are no projects to show.",
        });
      }
    } catch (errors) {
      res.status(500).json({
        status: "error",
        message: "Error getting the projetcs",
      }),
        console.log(errors);
    }
  },
  getOne: async function (req, res) {
    const { id } = req.params;

    const project = await findByPk(id);
    try {
      if (project) {
        res.status(200).json({
          status: "OK",
          project,
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "Sorry, there are no projects with this id.",
        });
      }
    } catch (errors) {
      res.status(500).json({
        status: "error",
        message: "Error getting the project",
      }),
        console.log(errors);
    }
  },
  newOne: async function (req, res) {
    const body = req.body;

    const project = await create(body);

    try {
      if (project) {
        res.status(201).json({
          status: "OK",
          message: "Project created!",
          project,
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "Error creating the project",
        });
      }
    } catch (errors) {
      res.status(500).json({
        status: "error",
        message: "Internal error",
      }),
        console.log(errors);
    }
  },
  deleteOne: async function (req, res) {
    const { id } = req.params;

    const project = await destroy(id);

    try {
      if (project) {
        res.status(200).json({
          status: "OK",
          message: "Project deleted!",
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "Sorry, there are no projects with this id.",
        });
      }
    } catch (errors) {
      res.status(500).json({
        status: "error",
        message: "Error deleting the project",
      }),
        console.log(errors);
    }
  },
  updateOne: async function (req, res) {
    const { id } = req.params;
    const data = req.body;

    const project = await update(id, data);

    try {
      if (project) {
        res.status(201).json({
          status: "OK",
          message: "Project updated!",
          project,
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "Sorry, there are no projects with this id.",
        });
      }
    } catch {
      (errors) => {
        res.status(500).json({
          status: "error",
          message: "Error updating the project",
        }),
          console.log(errors);
      };
    }
  },
  search: async function (req, res) {
    let { page, size, prevPage, name } = req.query;
    
    let search = {
    attributes: { exclude: ["deletedAt"] },
      include: [
        {
          association: "Contributor",
          attributes: { exclude: ["deletedAt"] },
        },
        {
          association: "Project Manager",
          attributes: { exclude: ["deletedAt"] },
        }
      ],
      limit: size,
      offset: page * size,
      where: {},
    };

    if (name != undefined && name.trim().length > 0) {
      search.where.name = { [Op.like]: `%${name.trim()}%` };
    }
    
    const response = await searchProjects(page, size, search);

    try {
      if (response.results != undefined && response.results.length > 0) {
        res.status(200).json({
          status: "OK",
          totalPages: Math.ceil(response.count / size),
          page: page,
          nextPage: page + 1,
          previousPage: prevPage,
          search: name,
          results: response.results,
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "Sorry, there are no results for this search.",
        });
      }
    } catch (errors) {
      res.status(500).json({
        status: "error",
        message: "Error getting the projetcs",
      }),
        console.log(errors);
    }
  },
};

module.exports = projectsService;
