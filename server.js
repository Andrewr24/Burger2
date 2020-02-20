var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var Sequelize = require("sequelize");

var port = process.env.PORT || 3306;

var db = require("./models");

db.burgers.sync();

var app = express();

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller");

app.use("/", routes);
app.use("/burgers", routes);
app.use("/create", routes);
app.use("/update", routes);
app.use("/burgers/create", routes);
app.use("/burgers/update", routes);
app.use("/api/all", routes);

require("./controllers/burgers_controller")(app);

app.listen(port, function(){
    console.log("listening on port " + port);
});