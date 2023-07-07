const fs = require("fs");
const zlib = require("zlib");
const path = require("path");
const { Transform, PassThrough, Duplex } = require("stream");

module.exports = {
  test: function (req, res) {
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

  testFileUpload: function (req, res) {
    console.log("req", req.body);
    res.send({
      msg: "success",
      data: req.body,
    });
  },
  testFileSystem: function (req, res) {
    console.log("req", req.body);
    res.send({
      msg: "success",
      data: req.body,
    });
  },
  testStream: function (req, res) {
    const inputFilePath = path.join(__dirname, "../", "files", "input.txt");
    const outputFilePath = path.join(__dirname, "../", "files", "output.txt");
    const customFilePath = path.join(__dirname, "../", "files", "custom.txt");
    const text = "This is some custom text that will be written to the file.";
    // writing custom string
    const writableStreamCustom = fs.createWriteStream(customFilePath);
    writableStreamCustom.write(text);
    // Create a readable stream from a file
    const readableStream = fs.createReadStream(inputFilePath);

    // Create a writable stream to a file
    const writableStream = fs.createWriteStream(outputFilePath);

    // Pipe the data from the readable stream  node to the writable stream
    readableStream.pipe(writableStream);

    // Listen for 'finish' and 'error' event on the writable stream
    writableStream.on("finish", () => {
      console.log("Data has been written to output.txt");
    });
    writableStream.on("error", (error) => {
      console.error("An error occurred:", error);
    });
    writableStreamCustom.on("finish", () => {
      console.log("Custom text has been written to custom.txt");
    });
    writableStreamCustom.on("error", (error) => {
      console.error("An error occurred:", error);
    });

    // sending response back to express
    res.send({
      msg: "success",
      data: [],
    });
  },
  testDuplexStream: function (req, res) {
    const inputFilePath = path.join(__dirname, "../", "files", "movie.txt");
    const outputFilePath = path.join(
      __dirname,
      "../",
      "files",
      "copymovie.txt"
    );

    const readStream = fs.createReadStream(inputFilePath);
    const writeStream = fs.createWriteStream(outputFilePath);

    class Throttle extends Duplex {
      //Class constructor will receive the injections as parameters.
      constructor(time) {
        super();
        this.delay = time;
      }
      _read() {}

      // Writes the data, push and set the delay/timeout
      _write(chunk, encoding, callback) {
        this.push(chunk);
        setTimeout(callback, this.delay);
      }

      // When all the data is done passing, it stops.
      _final() {
        this.push(null);
      }
    }

    const tunnel = new PassThrough();
    const throttle = new Throttle(1000);

    let amount = 0;
    tunnel.on("data", (chunk) => {
      amount += chunk.length;
      console.log("bytes:", amount);
    });

    readStream.pipe(throttle).pipe(tunnel).pipe(writeStream);

    // sending response back to express
    res.send({
      msg: "success",
      data: [],
    });
  },
  testTransformStream: function (req, res) {
    const customFilePath = path.join(__dirname, "../", "files", "custom.txt");
    const transfromFilePath = path.join(
      __dirname,
      "../",
      "files",
      "transformedData.txt"
    );
    const fileStream = fs.createReadStream(customFilePath);
    const transformedData = fs.createWriteStream(transfromFilePath);

    const uppercase = new Transform({
      transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
      },
    });

    fileStream.pipe(uppercase).pipe(transformedData);

    // sending response back to express
    res.send({
      msg: "success",
      data: [],
    });
  },
  testWebSockets: function (req, res) {
    console.log("req", req.body);
    res.send({
      msg: "success",
      data: req.body,
    });
  },
};
