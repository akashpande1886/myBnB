const Favourite = require("../models/fav.model");
const Home = require("../models/home.model");

exports.getIndex = async (req, res, next) => {
  try {
    const registeredHomes = await Home.find();
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    });
  } catch (err) {
    console.log("Error fetching homes for index:", err);
    res.render("store/index", {
      registeredHomes: [],
      pageTitle: "airbnb Home",
      currentPage: "index",
      errorMessage: "Failed to load homes.",
    });
  }
};

exports.getHome = async (req, res, next) => {
  try {
    const registeredHomes = await Home.find();
    res.render("store/home", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "home",
    });
  } catch (err) {
    console.log("Error fetching homes for home page:", err);
    res.render("store/home", {
      registeredHomes: [],
      pageTitle: "airbnb Home",
      currentPage: "home",
      errorMessage: "Failed to load homes.",
    });
  }
};

exports.getBookings = async (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

exports.getFavouriteList = async (req, res, next) => {
  try {
    const favourites = await Favourite.find().populate("homeId");
    const favouriteHomes = favourites.map((favourite) => favourite.homeId);
    res.render("store/favourites", {
      favHomes: favouriteHomes,
      pageTitle: "My favourites",
    });
  } catch (err) {
    console.log("Error fetching favourites:", err);
    res.render("store/favourites", {
      favHomes: [],
      pageTitle: "My favourites",
      errorMessage: "Failed to load your favourite homes.",
    });
  }
};

exports.postAddToFavouriteList = async (req, res, next) => {
  const homeId = req.body.id;
  try {
    const existingFav = await Favourite.findOne({ homeId: homeId });
    if (existingFav) {
      return res.redirect("/favourites");
    }
    const fav = new Favourite({ homeId: homeId });
    await fav.save();
    res.redirect("/favourites");
  } catch (err) {
    console.log("Error while adding to favourites:", err);
    res.redirect("/"); // Or wherever the user came from, with an error message
  }
};

exports.postRemoveFromFavouriteList = async (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("came to remove fav", homeId);
  try {
    await Favourite.findOneAndDelete({ homeId: homeId });
    res.redirect("/favourites");
  } catch (err) {
    console.log("Error while removing from favourites:", err);
    res.redirect("/favourites"); // Or back to the favourites page with an error message
  }
};

exports.getHomeDetails = async (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("At home details page:", homeId);
  try {
    const home = await Home.findById(homeId);
    if (!home) {
      console.log("Home not found!");
      return res.redirect("/index");
    }
    console.log("home details found", home);
    res.render("store/home-details", {
      home: home,
      pageTitle: "home details",
      currentPage: "home",
    });
  } catch (err) {
    console.log("Error fetching home details:", err);
    res.redirect("/index"); // Redirect to index with an error message if needed
  }
};
