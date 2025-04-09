const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtils");
const { root } = require("postcss");
const homeDataPath = path.join(rootDir, "data", "homes.json");
// let registeredHomes = []
module.exports = class Home {
  constructor(houseName, price, location, rating, imageUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.imageUrl = imageUrl;
  }
  save() {
    this.id = Math.random().toString(); //gen random id
    Home.fetchAll((registeredHomes) => {     //first fetch all the homes
      registeredHomes.push(this);               // push the new home to registered homes

      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
        console.log("File Writing concluded", error);
      });
    });
  }
  static fetchAll(callback) {
    fs.readFile(homeDataPath, (err, data) => {
      // console.log("File read", err, data);
      callback(!err ? JSON.parse(data) : []);
    });
  }
  static findById(homeId,callback){
    this.fetchAll(homes=>{
        const homeFound = homes.find(home => home.id ===homeId);
        callback(homeFound)
    })
  }
};
