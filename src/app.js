var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

//Swagger setup
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerConfig = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Project Management API",
      version: "1.0.0",
      description:"Welcome! this is a simple task organizer, you can create projects and members to assign to them. Every project must have a project manager and a contributor, you can add members and create projects from their respective endpoint below."
    },
    servers:[
      {
        url:"https://project-manager-service.herokuapp.com"
      },
      {
        url:`http://localhost:${process.env.PORT || '3000'}`
      }
      
    ]
  },
  apis: [`${path.join(__dirname,"./routes/*.js")}`]
};

var indexRouter = require("./routes/index");
let projectsRouter = require("./routes/projects");
let membersRouter = require("./routes/members");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/v1/projects", projectsRouter);
app.use("/api/v1/members", membersRouter);
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerConfig)));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
