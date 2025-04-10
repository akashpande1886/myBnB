const Favourite = require("../models/fav.model");
const Home = require("../models/home.model");

// const registeredHomes = [];

exports.getIndex = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    });
  });
};
exports.getHome = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "home",
    });
  });
};
exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};
exports.getFavouriteList = (req, res, next) => {
  Favourite.getFav((favourites) => {
    Home.find().then((registeredHomes) => {
      const favHomes = registeredHomes.filter((home) =>
        favourites.includes(home.id)
      
      );
      res.render("store/favourites", {
        favHomes: favHomes,
        pageTitle: "My favourites",
        currentPage: "favourites",
      });
    });
  });
};
exports.postAddToFavouriteList = (req, res, next) => {
  Favourite.addToFav(req.body.id, (err) => {
    if (err) {
      console.log("Error while marking favourite", err);
    }
    res.redirect("/favourites");
  });
};

exports.postRemoveFromFavouriteList = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, (err) => {
    if (err) {
      console.log("error while removing from favourites", err);
   
    }
    res.redirect("/favourites");
  });
};
exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("At home details page:", homeId);
  //  console.log(registeredHomes)

  Home.findById(homeId).then( (home) => {
    if (!home) {
      console.log("Home not found!");
      res.redirect("/index");
    } else {
      console.log("home details found", home);
      res.render("store/home-details", {
        // registeredHomes: registeredHomes(),
        home: home,
        pageTitle: "home details",
        currentPage: "home",
      });
    }
  });
};

// exports.registeredHomes = registeredHomes;
