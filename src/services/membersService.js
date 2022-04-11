const { create, getAll, update, destroy } = require("../repositories/membersRepository");

const memberServices = {
  register: async function (req, res) {
    const body = req.body;

    const member = await create(body);

    try {
      if (member) {
        res.status(201).json({
          status: "OK",
          message: "Successfully registered!",
          member,
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "Error registering the member",
        });
      }
    } catch (errors) {
      res.status(500).json({
        status: "error",
        message: "Internal error",
      }),
        console.log(errors);
    }
  },
  getAllMembers: async (req, res) => {
    let { page, size, prevPage } = req.query;

    const members = await getAll(page, size);

    try {
      if (members != undefined) {
        res.status(200).json({
          status: "OK",
          totalPages: Math.ceil(members.count / size),
          page: page,
          nextPage: page + 1,
          previousPage: prevPage,
          content: members.rows,
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "Sorry, there are no members to show.",
        });
      }
    } catch (errors) {
      res.status(500).json({
        status: "error",
        message: "Internal error",
      }),
        console.log(errors);
    }
  },
  deleteOne: async function (req, res) {
    const { id } = req.params;

    const members = await destroy(id);

    try {
      if (members) {
        res.status(200).json({
          status: "OK",
          message: "Member deleted!",
        });
      } else {
        res.status(204).json({
          status: "error",
          message: "Sorry, there are no members with this id.",
        });
      }
    } catch (errors) {
      res.status(500).json({
        status: "error",
        message: "Internal error",
      }),
        console.log(errors);
    }
  },
  updateOne: async function (req, res) {
    const { id } = req.params;
    const data = req.body;

    const member = await update(id, data);

    try {
      if (member) {
        res.status(201).json({
          status: "OK",
          message: "Member info updated!",
          member,
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "Sorry, there are no members with this id.",
        });
      }
    } catch {
      (errors) => {
        res.status(500).json({
          status: "error",
          message: "Internal error",
        }),
          console.log(errors);
      };
    }
  },
};

module.exports = memberServices;
