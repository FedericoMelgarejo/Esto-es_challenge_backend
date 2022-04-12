var express = require("express");
const {
  getProjectsList,
  createProject,
  getSingleProject,
  deleteProject,
  updateProject,
  search,
} = require("../controllers/projectsController");
const { pagination } = require("../middlewares/paginationMiddleware");
const { validateCreate } = require("../validators/projectsValidator");
var router = express.Router();

    //Projects schema
/**
 * @swagger
 * components:
 *  schemas:
 *      Project:
 *          type: object
 *          properties:
 *             name:
 *                type: string
 *                description: the project name
 *             description:
 *                type: string
 *                description: project description
 *             status:
 *                type: integer
 *                description: project status, can be 0 (false) or 1 (true)
 *             project_manager_id:
 *                type: integer
 *                description: project manager ID, must belong to existing member
 *             contributor_id:
 *                type: integer
 *                description: contributor ID, must belong to existing member
 *          required:
 *              - name
 *              - status
 *              - projcet_manager_id
 *              - contributor_id
 *          example:
 *              name: EXAMPLE NAME
 *              description: EXAMPLE DESCRIPTION
 *              status: "1"
 *              project_manager_id: "2"
 *              contributor_id: "1"
 */

    //Get projects listing
/**
 * @swagger
 * /api/v1/projects/list:
 *  get:
 *      summary: Get all projects
 *      tags: [Project]
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *             type: string
 *          description: page number, default value = 0
 *        - in: query 
 *          name: size
 *          schema:
 *              type: string
 *          description: page size, default value = 10
 *      responses:
 *          200:
 *           description: A list of all projects
 *           content:
 *              aplication/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Project'
 */

    //Search projects by name
/**
 * @swagger
 * /api/v1/projects/search:
 *  get:
 *      summary: Search projects by name
 *      tags: [Project]
 *      parameters:
 *        - in: query
 *          name: name
 *          schema:
 *             type: string
 *          description: search parameter
 *        - in: query
 *          name: page
 *          schema:
 *             type: string
 *          description: page number, default value = 0
 *        - in: query 
 *          name: size
 *          schema:
 *              type: string
 *          description: page size, default value = 10
 *      responses:
 *          200:
 *           description: list of projects whose names match the search parameters
 *           content:
 *              aplication/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Project'
 */

    //Get project by ID
/**
 * @swagger
 * /api/v1/projects/{id}:
 *  get:
 *      summary: Fetch project by id
 *      tags: [Project]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: the project id
 *      responses:
 *          200:
 *           description: found project
 *           content:
 *              aplication/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Project'
 *          400:
 *           description: bad request, project not found
 */

    //Create new project
/**
 * @swagger
 * /api/v1/projects/create:
 *  post:
 *    summary: Create a project
 *    tags: [Project]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Project'
 *    responses:
 *        201:
 *         description: new project created!
 */

    //Update project by ID
/**
 * @swagger
 * /api/v1/projects/update/{id}:
 *  put:
 *      summary: Update project info by id
 *      tags: [Project]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: the project id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Project'
 *      responses:
 *          201:
 *           description: project updated
 *           content:
 *              aplication/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Project'
 *          400:
 *           description: bad request, project not found
 */

    //Delete project by ID
/**
 * @swagger
 * /api/v1/projects/delete/{id}:
 *  delete:
 *      summary: Delete project by id
 *      tags: [Project]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: the project id
 *      responses:
 *          200:
 *           description: project deleted
 *           content:
 *              aplication/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Project'
 *          400:
 *           description: bad request, project not found
 */

router.get("/list", pagination, getProjectsList);

router.post("/create", validateCreate, createProject);

router.get("/search", pagination, search);

router.get("/:id", getSingleProject);

router.delete("/delete/:id", deleteProject);

router.put("/update/:id", validateCreate, updateProject);

module.exports = router;
