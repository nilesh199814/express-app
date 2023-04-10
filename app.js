const express = require("express");
const app = express();
// This is your test secret API key.
app.use(express.static("public"));
app.use(express.json());
const testRoutes = require("./routes/test-routes");
app.use("/", testRoutes);
app.listen(4242, () => console.log("server listening on port 4242........."));
