const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtils");
const { root } = require("postcss");
const favDataPath = path.join(rootDir, "data", "favourite.json");
// let registeredHomes = []
module.exports = class Favourite {
  static addToFav(homeId, callback) {
    Favourite.getFav((favourites) => {
      if (favourites.includes(homeId)) {
        callback("Home is already marked favourite")
        // console.log();
      } else {
        favourites.push(homeId);
        fs.writeFile(favDataPath, JSON.stringify(favourites), callback);
      }
    });
  }

  static getFav(callback) {
    fs.readFile(favDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
  static deleteById(delHomeId, callback) {
    Favourite.getFav((homeIds) => {
homeIds = homeIds.filter((homeId) => delHomeId !== homeId);
      fs.writeFile(favDataPath, JSON.stringify(homeIds), 
      callback)
    });
  }
};

