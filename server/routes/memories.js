const express = require("express");
const router = express.Router();

//Controllers
const {
  getMemories,
  addMemory,
  updateMemory,
  deleteMemory,
} = require("../controllers/memories");

//Routes
router.route("/").get(getMemories).post(addMemory);
router.route("/:id").patch(updateMemory).delete(deleteMemory);

module.exports = router;
