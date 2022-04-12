var express = require("express");
const { registerMember, getMembersList, deleteMember, updateMember } = require("../controllers/membersController");
var router = express.Router();
const { members } = require("../database/models");
const { pagination } = require("../middlewares/paginationMiddleware");

    //Members schema
/**
 * @swagger
 * components:
 *  schemas:
 *      Member:
 *          type: object
 *          properties:
 *             name:
 *                type: string
 *                description: the member name
 *             email:
 *                type: string
 *                description: member email
 *          required:
 *              - name
 *          example:
 *              name: EXAMPLE NAME
 *              email: example_mail@mail.com
 */

    //Get members listing
/**
 * @swagger
 * /api/v1/members/list:
 *  get:
 *      summary: Get all members
 *      tags: [Member]
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *             type: string
 *          description: page number, default value is 0
 *        - in: query 
 *          name: size
 *          schema:
 *              type: string
 *          description: page size, default value is 10
 *      responses:
 *          200:
 *           description: A list of all members
 *           content:
 *              aplication/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Member'
 */

    //Create new member
/**
 * @swagger
 * /api/v1/members/register:
 *  post:
 *    summary: Create a member
 *    tags: [Member]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Member'
 *    responses:
 *        201:
 *         description: new member registered!
 */

    //Update member by ID
/**
 * @swagger
 * /api/v1/members/update/{id}:
 *  put:
 *      summary: Update member info by id
 *      tags: [Member]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: the member id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Member'
 *      responses:
 *          201:
 *           description: member updated
 *           content:
 *              aplication/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Project'
 *          400:
 *           description: bad request, member not found
 */

    //Delete member by ID
/**
 * @swagger
 * /api/v1/members/delete/{id}:
 *  delete:
 *      summary: Delete member by id
 *      tags: [Member]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: the member id
 *      responses:
 *          200:
 *           description: member deleted
 *           content:
 *              aplication/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Member'
 *          400:
 *           description: bad request, member not found
 */


router.post("/register", registerMember);

router.get("/list", pagination, getMembersList );

router.delete("/delete/:id", deleteMember);

router.put("/update/:id", updateMember );

module.exports = router;
