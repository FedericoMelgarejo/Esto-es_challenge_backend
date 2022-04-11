const { check, body } = require("express-validator");
const { users } = require("../database/models");
const { validate } = require("../utils/validateHelper");

const validateCreate = [
  check("name").trim().not().isEmpty().withMessage("Field name is required"),
  check("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Field description is required"),
  check("status")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Field status is required")
    .isNumeric()
    .withMessage("Field status must be a number"),
  body("status").custom(async (value) => {
    if (value > 1) {
      return Promise.reject("Field status must be a number between 0 and 1");
    }
  }),
  check("project_manager_id")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Field projcet_manager_id is required")
    .isNumeric()
    .withMessage("Field project_manager_id must be a number"),
  body("project_manager_id").custom(async (value) => {
    const exist = await users.findByPk(value);
    if (!exist) {
      return Promise.reject("Project manager id must belong to existing user");
    }
  }),
  check("contributor_id")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Field contributor_id is required")
    .isNumeric()
    .withMessage("Field contributor_id must be a number"),
  body("contributor_id").custom(async (value) => {
    const exist = await users.findByPk(value);
    if (!exist) {
      return Promise.reject("Contributor id must belong to existing user");
    }
  }),
  (req, res, next) => validate(req, res, next),
];

module.exports = { validateCreate };
