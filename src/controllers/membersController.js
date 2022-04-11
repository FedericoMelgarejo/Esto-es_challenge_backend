const { register, getAllMembers, updateOne, deleteOne } = require("../services/membersService");

const membersController = {
  registerMember: async (req, res) => {
    await register(req, res);
  },
  getMembersList: async (req, res) => {
    await getAllMembers(req, res);
  },
  updateMember: async (req, res) => {
    await updateOne(req, res);
  },
  deleteMember: async (req, res) => {
    await deleteOne(req, res);
  },
};

module.exports = membersController;
