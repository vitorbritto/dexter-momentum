const extension = ".css";

// Object Mapping
const extensionMapper = {
  ".css": "text/css",
  ".html": "text/html",
  ".json": "application/json",
};

console.log(extensionMapper[extension] || "text/html");

// Map alternative
const mapper = new Map();

mapper.set(".css", "text/css");
mapper.set(".html", "text/html");
mapper.set(".json", "application/json");

console.log(mapper.get(extension) || "text/html");
