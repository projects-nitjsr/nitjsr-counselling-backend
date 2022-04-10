const router = require("express").Router();
const login = require("./auth/login");

router.get("/login", login);

module.exports = router;
