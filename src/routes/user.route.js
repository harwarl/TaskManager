const { getUser } = require("../controllers/auth.controller");
const { isAuth } = require("../middlewares/isAuth");
const router = require("express").Router();

router.get("/", isAuth, getUser);
router.put("/", isAuth, updateUser);

module.exports = router;
