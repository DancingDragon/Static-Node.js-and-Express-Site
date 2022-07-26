const express = require("express");
const data = require("./data.json");

const app = express();
app.set("view engine", "pug");
const port = 3000; 

app.use("/static", express.static("public"));
app.use("/images", express.static("images"));


app.get("/", (req, res) => {	
	res.render(__dirname + "/views/index", {projects: data["projects"]});
});
app.get("/about", (req, res) => {
	res.render(__dirname + "/views/about");
});
app.get("/project/:id", (req, res) => {
	res.render(__dirname + "/views/project", {project:data["projects"][req.params.id]});
});


//404
app.use((req, res, next) => {
	const err = new Error("Page not found");
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.locals.error = err;
	res.render(__dirname + "/views/error");
});


app.listen(port);
console.log("Listening to port " + port);
