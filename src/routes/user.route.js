const { isAuth } = require("../middlewares/isAuth");
const { getUser, updateUser } = require("../controllers/user.controller");
const router = require("express").Router();

router.get("/", isAuth, getUser);
router.put("/", isAuth, updateUser);

module.exports = router;
