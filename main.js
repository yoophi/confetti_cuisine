"use strict";

const express = require("express"),
  app = express(),
  router = express.Router(),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  subscribersController = require("./controllers/subscribersController"),
  usersController = require("./controllers/usersController"),
  Subscriber = require("./models/subscriber");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/recipe_db", {
  useNewUrlParser: true,
});
mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

router.use(express.static("public"));
router.use(layouts);
router.use(
  express.urlencoded({
    extended: false,
  })
);

router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

router.use(express.json());
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/courses", homeController.showCourses);
router.get("/contact", homeController.showSignUp);
router.post("/contact", homeController.postedSignUpForm);
router.get("/subscribe", subscribersController.getSubscriptionPage);
router.post("/subscribe", subscribersController.saveSubscriber);
router.get(
  "/subscribers",
  subscribersController.getAllSubscribers,
  (req, res, next) => {
    res.render("subscribers", { subscribers: req.data });
  }
);
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post(
  "/users/create",
  usersController.create,
  usersController.redirectView
);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put(
  "/users/:id/update",
  usersController.update,
  usersController.redirectView
);
router.delete(
  "/users/:id/delete",
  usersController.delete,
  usersController.redirectView
);
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);
app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
