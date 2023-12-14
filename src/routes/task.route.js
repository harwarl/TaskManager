const { validator } = require("../middlewares/validator");
const { schemas } = require("../../utils/validator");
const { isAuth } = require("../middlewares/isAuth");
const { addTask, updateTask } = require("../controllers/task.controller");

const router = require("express").Router();

router.post("/add", validator(schemas.addTask), isAuth, addTask);
router.post("/update/:id", validator(schema.updateTask), isAuth, updateTask);

module.exports = router;
