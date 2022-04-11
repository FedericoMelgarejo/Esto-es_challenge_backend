var express = require('express');
const { getProjectsList, createProject, getSingleProject, deleteProject, updateProject } = require('../controllers/projectsController');
var router = express.Router();

/* GET projects listing. */
router.get('/list', getProjectsList);

router.post('/create', createProject);

router.get('/:id', getSingleProject);

router.delete('/delete/:id', deleteProject);

router.put('/update/:id', updateProject);

module.exports = router;
