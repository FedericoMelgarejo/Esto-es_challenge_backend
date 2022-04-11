var express = require("express");
const { registerMember, getMembersList, deleteMember, updateMember } = require("../controllers/membersController");
var router = express.Router();
const { members } = require("../database/models");
const { pagination } = require("../middlewares/paginationMiddleware");

router.post("/register", registerMember);

router.get("/list", pagination, getMembersList );

router.delete("/delete/:id", deleteMember);

router.put("/update/:id", updateMember );

module.exports = router;
