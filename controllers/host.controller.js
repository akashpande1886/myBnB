const Home = require("../models/home.model");

// const registeredHomes = [];

exports.getAddHome = (req, res, next) => {
  res.render("host/addHome", { pageTitle: "Add Home" });
};

exports.postAddHome = (req, res, next) => {
  console.log(
    "Home registration successfull for",
    req.body,
    req.body.houseName
  );
  const { houseName, price, location, rating, imageUrl } = req.body;
  const home = new Home(houseName, price, location, rating, imageUrl);
  home.save();
  // res.sendFile(path.join(rootDir, "views", "addedHome.html"));
  res.render("host/addedHome", { pageTitle: "Homes Added" });
};
exports.getHostHomes = (req, res, next) => {
 Home.fetchAll((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage:"index"
    });
  });
};


// exports.registeredHomes = registeredHomes;
