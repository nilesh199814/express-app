const express = require("express");
const app = express();
const bodyParser = require('body-parser');
// This is your test secret API key.
app.use(bodyParser.json()); 
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static("public"));
app.use(express.json());
const testRoutes = require("./routes/test-routes");
const dbRoutes = require("./routes/db-routes");
app.use("/", testRoutes, dbRoutes);
app.listen(4242, () => console.log("server listening on port 4242........."));
