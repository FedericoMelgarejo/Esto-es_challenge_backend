var express = require("express");
const { getProjectsList, createProject, getSingleProject, deleteProject, updateProject, search } = require('../controllers/projectsController');
const { pagination } = require("../middlewares/paginationMiddleware");
const { validateCreate } = require("../validators/projectsValidator");
var router = express.Router();


router.get("/list", pagination, getProjectsList);

router.get("/search", pagination, search);

router.post("/create", validateCreate, createProject);

router.get("/:id", getSingleProject);

router.delete("/delete/:id", deleteProject);

router.put("/update/:id", validateCreate, updateProject);

module.exports = router;
