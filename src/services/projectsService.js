const { findByPk, getAll, create, destroy, update } = require("../repositories/projectsRepository");

const projectsService = {
  getAllProjects: async (req, res) => {
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);

    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }

    let size = 10;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
      size = sizeAsNumber;
    }

    const projects = await getAll(page, size);

    try {
      if (projects != undefined) {
        res.status(200).json({
          status: "OK",
          totalPages: Math.ceil(projects.count / size),
          page: page,
          nextPage: page + 1,
          previousPage: page - 1,
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
        message: "Error creating the project",
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
        res.status(204).json({
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
};

module.exports = projectsService;
