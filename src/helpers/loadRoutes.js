const fs = require("fs");
const path = require("path");
const notFound = require("../middlewares/notFound");
const errorHandler = require("../middlewares/errorHandler");

function makePlural(word) {
  if (
    word.endsWith("s") ||
    word.endsWith("x") ||
    word.endsWith("z") ||
    word.endsWith("ch") ||
    word.endsWith("sh")
  ) {
    return word + "es";
  } else if (word.endsWith("y")) {
    return word.slice(0, -1) + "ies";
  } else {
    return word + "s";
  }
}

function loadRoutes(app) {
  const modulesPath = "../modules";
  const directoryPath = path.join(__dirname, modulesPath);
  // Klasördeki modüller için router'lar oluşturulur
  fs.readdir(directoryPath, (err, moduleFolders) => {
    if (err) {
      return console.error("Klasör okunamadı:", err);
    }

    moduleFolders.forEach((moduleFolder) => {
      const moduleDirectoryPath = path.join(directoryPath, moduleFolder);

      const routePath = path.join(
        moduleDirectoryPath,
        `${moduleFolder}.route.js`
      );

      if (fs.existsSync(routePath)) {
        const plural = makePlural(moduleFolder);
        app.use(`/api/${plural}`, require(routePath));
      }
    });

    app.use(notFound);
    app.use(errorHandler);
  });
}

module.exports = loadRoutes;
