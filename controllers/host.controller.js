const Home = require("../models/home.model");

// const registeredHomes = [];

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home",
    currentPage: "addHome",
    editing: false,
  });
};
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId, (home) => {
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
  });
};
exports.postAddHome = (req, res, next) => {

  const { houseName, price, location, rating, imageUrl } = req.body;
  const home = new Home(houseName, price, location, rating, imageUrl);
  home.save();

  res.redirect("/host/host-home-list");
};
exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    });
  });
};
exports.postEditHome = (req, res, next) => {
  console.log(
    "Home registration successfull for",
    req.body,
    req.body.houseName
  );
  const { id, houseName, price, location, rating, imageUrl } = req.body;
  const home = new Home(houseName, price, location, rating, imageUrl);
  home.id = id;
  home.save();
  // res.sendFile(path.join(rootDir, "views", "addedHome.html"));
  res.redirect("/host/host-home-list");
};
exports.postDeleteHome = (req, res, next) => {

const homeId = req.params.homeId;
console.log("came to delete home id",homeId)
Home.deleteById(homeId,err=>{
  if(err){
    console.log("error while deleting",err)
  }
  res.redirect("/host/host-home-list");
})

};


