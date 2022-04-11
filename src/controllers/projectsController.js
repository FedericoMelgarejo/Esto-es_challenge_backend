const { getAllProjects, getOne, newOne, deleteOne, updateOne, search  } = require("../services/projectsService");

const projectsController = {
  getProjectsList: async (req, res) => {
    await getAllProjects(req, res);
  },
  getSingleProject: async (req, res) => {
    await getOne(req, res);
  },
  createProject: async (req, res) => {
    await newOne(req, res);
  },
  updateProject: async (req, res) => {
    await updateOne(req, res);
  },
  deleteProject: async (req, res) => {
    await deleteOne(req, res);
  },
  search: async (req, res) => {
    await search(req, res);
  },
};

module.exports = projectsController;
