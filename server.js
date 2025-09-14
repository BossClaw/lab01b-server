// INC THE REQUIRED MODULES
const http = require("http");
const fs = require("fs");
const path = require("path");

// SETUP THE PORT CONST
// V2DO - USE .env TO SUPPORT DIFFERENT LOCAL & PROD
const PORT = 3000;

// CREATE THE SERVER
const server = http.createServer((req, res) => {
	// LOG THE URL
	// V2DO - ADD .env DEBUG MODE?
	console.log("ATTEMPTING TO SERVE URL[" + req.url + "]");

	// SETUP VARS
	let filePath;
	let contentType = "text/html; charset=utf-8";

	// SWITCH TO DETERMINE WHICH FILE TO READ
	if (req.url === "/") {
		filePath = path.join(__dirname, "index.html");
	} else if (req.url === "/about") {
		filePath = path.join(__dirname, "about.html");
	} else if (req.url === "/contact") {
		filePath = path.join(__dirname, "contact.html");
	} else if (req.url === "/style.css") {
		filePath = path.join(__dirname, "style.css");
		contentType = "text/css";
	} else {
		// DEFAULT IS MISSING, SO GET THE 404
		filePath = path.join(__dirname, "404.html");
		contentType = "text/html; charset=utf-8";
		res.statusCode = 404;
	}

	// ATTEMPT READING THE FILE
	fs.readFile(filePath, (err, content) => {
		// HANDLE ERROR IF FILE MISSING OR SOME OTHER PROB, AND THROW A 500
		if (err) {
			console.error("Error reading file:", err);
			res.statusCode = 500;
			res.setHeader("Content-Type", "text/plain");
			res.end("Internal Server Error");
			return;
		}

		// SET HEADERS AND RETURN THE FILE CONTENTS WITH THE END TO FINISH SERVING
		res.setHeader("Content-Type", contentType);
		res.end(content);
	});
});


// START THE SERVER LISTENING ON THE PORT const
server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});
