const fs = require("fs");
const http = require("http");
const readline = require("readline");
const args = require("minimist")(process.argv.slice(2));

let homeContent = "";
let projectContent = "";
let registrationContent = "";
let scriptContent = "";
let cssContent = "";

fs.readFile("home.html", function (err, home) {
  if (err) throw err;
  homeContent = home;
});

fs.readFile("project.html", function (err, project) {
  if (err) throw err;
  projectContent = project;
});

fs.readFile("registration.html", function (err, registration) {
  if (err) throw err;
  registrationContent = registration;
});

fs.readFile("form.js", function (err, form) {
  if (err) throw err;
  scriptContent = form;
});

fs.readFile("main.css", function (err, main) {
  if (err) throw err;
  cssContent = main;
});

http
  .createServer(function (request, response) {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    let stream;
    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        break;
      case "/form.js":
        response.write(scriptContent);
        response.end();
        break;
      case "/main.css":
        response.writeHeader(200, { "Content-Type": "text/css" });
        response.write(cssContent);
        response.end();
        break;
      case "/registration":
        response.write(registrationContent);
        response.end();
        break;
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(args.port, console.log("server started!"));
