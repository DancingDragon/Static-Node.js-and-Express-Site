const express = require("express");
const data = require("./data.json");

const port = 3000; 
//initialize app
const app = express();
app.set("view engine", "pug");

//Serve the static content, css, images, scripts
app.use("/static", express.static("public"));
app.use("/images", express.static("images"));

//Main page
app.get("/", (req, res) => {	
	res.render(__dirname + "/views/index", {projects: data.projects});
});
//About page
app.get("/about", (req, res) => {
	res.render(__dirname + "/views/about");
});
//Project page
app.get("/project/:id", (req, res) => {
	//if id is not within acceptable scope throw an 404 error
	if (req.params.id >= 0 && req.params.id < data.projects.length)
		res.render(__dirname + "/views/project", {project:data.projects[req.params.id]});
	else {
		const err = new Error("Page not found");
		err.status = 404;
		throw err;
	}
});


//If content not found throw 404
app.use((req, res, next) => {
	const err = new Error("Page not found");
	err.status = 404;
	console.log("404 not found at "+ req.originalUrl);
	next(err);
});

// Generic error handling
app.use((err, req, res, next) => {
	res.locals.error = err;
	if (err.status === 404) 
		res.render(__dirname + "/views/page-not-found");
	else 
		res.render(__dirname + "/views/error");
});

//Configure what port to listen to
app.listen(port);
console.log("Listening to port " + port);
