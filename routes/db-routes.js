const express = require("express");
const router = express.Router();
const dbMethods = require("../methods/db-methods");

router.get("/test-db", dbMethods.test);


module.exports = router;