const { validator } = require("../middlewares/validator");
const { schemas } = require("../../utils/validator");
const { signup, signin, getUser } = require("../controllers/auth.controller");
const { isAuth } = require("../middlewares/isAuth");

const router = require("express").Router();

router.post("/signup", validator(schemas.signup), signup);

router.post("/login", validator(schemas.signin), signin);

router.get("/me", isAuth, getUser);

module.exports = router;
