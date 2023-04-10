const express = require("express");
const router = express.Router();
const testMethods = require("../methods/test-methods");
const { validate, ValidationError, Joi } = require("express-validation");

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
// define the home page route
router.get("/", (req, res) => {
  res.send("Birds home page");
});

// define methods
router.get("/test", (req, res) => {
  return testMethods.test(req, res);
});

// short hand for same method
router.get("/test/v2", testMethods.test);

// validation for payload 
const loginValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
};
// 
/* router.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err)
    }
  
    return res.status(500).json(err)
  })
 */

router.post("/login", validate(loginValidation, {}, {}), testMethods.login);
module.exports = router;
