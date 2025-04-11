const Home = require("../models/home.model");

exports.getAddHome = async (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home",
    currentPage: "addHome",
    editing: false,
  });
};

exports.getEditHome = async (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  try {
    const home = await Home.findById(homeId);
    if (!home) {
      console.log("Home not found for editing");
      return res.redirect("/host/host-home-list");
    }
    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit Home",
      currentPage: "host-homes",
      editing: editing,
    });
  } catch (err) {
    console.log("Error while finding home", err);
    // Consider rendering an error page or redirecting with an error message
    res.redirect("/host/host-home-list");
  }
};

exports.postAddHome = async (req, res, next) => {
  const { houseName, price, location, rating, imageUrl } = req.body;
  const home = new Home({ houseName, price, location, rating, imageUrl });
  try {
    await home.save();
    res.redirect("/host/host-home-list");
  } catch (err) {
    console.log("Error while saving home", err);
    // Consider rendering an error page or redirecting with an error message
    res.redirect("/host/add-home"); // Or wherever the form is
  }
};

exports.getHostHomes = async (req, res, next) => {
  try {
    const registeredHomes = await Home.find();
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    });
  } catch (err) {
    console.log("Error while fetching homes", err);
    // Consider rendering an error page or displaying an error message
    res.render("host/host-home-list", {
      registeredHomes: [],
      pageTitle: "airbnb Home",
      currentPage: "index",
      errorMessage: "Failed to load homes.",
    });
  }
};

exports.postEditHome = async (req, res, next) => {
  const { id, houseName, price, location, rating, imageUrl } = req.body;
  try {
    const home = await Home.findById(id);
    if (!home) {
      console.log("Home not found for updating");
      return res.redirect("/host/host-home-list");
    }
    home.houseName = houseName;
    home.price = price;
    home.location = location;
    home.rating = rating;
    home.imageUrl = imageUrl;
    const result = await home.save();
    console.log("Home updated", result);
    res.redirect("/host/host-home-list");
  } catch (err) {
    console.log("Error while updating home", err);
    // Consider rendering an error page or redirecting with an error message
    res.redirect(`/host/edit-home/${id}?editing=true`); // Redirect back to edit form with error
  }
};

exports.postDeleteHome = async (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("came to delete home id", homeId);
  try {
    await Home.findByIdAndDelete(homeId);
    res.redirect("/host/host-home-list");
  } catch (err) {
    console.log("Error while deleting home", err);
    // Consider redirecting back with an error message
    res.redirect("/host/host-home-list");
  }
};
