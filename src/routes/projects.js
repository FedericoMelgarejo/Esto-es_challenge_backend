var express = require("express");
const { getProjectsList, createProject, getSingleProject, deleteProject, updateProject } = require('../controllers/projectsController');
const { validateCreate } = require("../validators/projectsValidator");
var router = express.Router();

/* GET projects listing. */
router.get("/list", getProjectsList);

router.post("/create", validateCreate, createProject);

router.get("/:id", getSingleProject);

router.delete("/delete/:id", deleteProject);

router.put("/update/:id", validateCreate, updateProject);

module.exports = router;
