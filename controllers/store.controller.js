const Home = require("../models/home.model");

// const registeredHomes = [];

exports.getIndex = (req, res, next) => {
Home.fetchAll((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage:"index"
    });
  });
};
exports.getHome = (req, res, next) => {
Home.fetchAll((registeredHomes) => {
    res.render("store/home", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
        currentPage:"home"
    });
  });
};
exports.getBookings = (req, res, next) => {
  
    res.render("store/bookings", {
 
      pageTitle: "My Bookings",
      currentPage:"bookings"
    });
 
};
exports.getFavouriteList = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render("store/favourites", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
        currentPage:"favourites"
    });
  });
    
};
exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
 console.log("At home details page:",homeId)
 console.log(registeredHomes)
      res.render("store/home-details", {
        // registeredHomes: registeredHomes(),
       
        pageTitle: "home details",
          currentPage:"home"
      });
 
  };

// exports.registeredHomes = registeredHomes;
