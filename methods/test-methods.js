module.exports = {
  test: function (req, res) {
    console.log("working");
    res.send("working");
  },

  login: function (req, res) {
    console.log("working");
    res.send({
      msg: "success",
      data: req.body,
    });
  },
};
