const fs = require("fs");
const path = require("path");
const notFound = require("../middlewares/notFound");
const errorHandler = require("../middlewares/errorHandler");

function loadRoutes(app) {
  return new Promise((resolve, reject) => {
    const modulesPath = "../modules";
    const directoryPath = path.join(__dirname, modulesPath);
    // Klasördeki modüller için router'lar oluşturulur
    fs.readdir(directoryPath, (err, moduleFolders) => {
      if (err) {
        return reject(err);
      }

      moduleFolders.forEach((moduleFolder) => {
        const moduleDirectoryPath = path.join(directoryPath, moduleFolder);

        const routePath = path.join(
          moduleDirectoryPath,
          `${moduleFolder}.route.js`
        );

        if (fs.existsSync(routePath)) {
          app.use(`/api/${moduleFolder}`, require(routePath));
        }
      });
      app.use(notFound);
      app.use(errorHandler);
      //resolve app route stack
      resolve(app._router.stack);
    });
  });
}

module.exports = loadRoutes;
