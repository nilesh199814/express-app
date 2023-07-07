const express = require("express");
const router = express.Router();
const testMethods = require("../methods/test-methods");
const { validate, Joi } = require("express-validation");

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
// define the home page route
router.get("/", (req, res) => {
  res.send("Birds home page");
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

router.post("/login", validate(loginValidation, {}, {}), testMethods.login);

// testing public key
router.post("/public-login", testMethods.publicLogin);

// testing event
router.get("/test-event", testMethods.testEvent);

// testing file upload
router.post("/test-file-upload", testMethods.testFileUpload);

// testing file system
router.post("/test-file-system", testMethods.testFileSystem);

// testing stream
router.post("/test-stream", testMethods.testStream);
router.post("/test-duplex-stream", testMethods.testDuplexStream);
router.post("/test-transfrom-stream", testMethods.testTransformStream);

// testing WebSockets
router.post("/test-web-socket", testMethods.testWebSockets);

// testing Event Driven Architecture

module.exports = router;
