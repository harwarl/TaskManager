const { validator } = require("../middlewares/validator");
const { schemas } = require("../../utils/validator");
const { isAuth } = require("../middlewares/isAuth");
const {
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

const router = require("express").Router();

router.post("/add", validator(schemas.addTask), isAuth, addTask);
router.put("/:id", validator(schemas.updateTask), isAuth, updateTask);
router.delete("/:id", isAuth, deleteTask);

module.exports = router;
