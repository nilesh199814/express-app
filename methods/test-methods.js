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
  publicLogin: function (req, res) {
    console.log("working");
    res.send({
      msg: "success",
      data: req.body,
    });
  },
  testEvent: function (req, res) {
    // Importing events
    const EventEmitter = require("events");

    // Initializing event emitter instances
    var myEmitter = new EventEmitter();

    function a() {
      console.log("hello this is a.");
    }
    function b() {
      console.log("hello this is b.");
    }

    myEmitter.on("eventOne", a);
    myEmitter.on("eventrtwo", b);

    myEmitter.emit("eventOne");
    myEmitter.emit("eventrtwo");

    res.send({
      msg: "success",
      data: [],
    });
  },

  testFile: function (req, res) {
    console.log('req', req.body);
    res.send({
      msg: "success",
      data: req.body,
    });
  },
};
