const express = require("express");
const router = express.Router();
const {
  usersApi,
  userApi,
  patchUser,
  postUser,
  deleteUser,
  getUserByEmail
} = require("../controller/userController");

// get users
router.get("/", usersApi);
// post user
router.post("/", postUser);
// get user
router.get("/:_id", userApi);
// get user by email
router.get("/email/:email", getUserByEmail);
// patch users
router.patch("/:_id", patchUser);
// patch users
router.delete("/:_id", deleteUser);

// export router
module.exports = router;
