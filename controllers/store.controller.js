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
  Favourite
  .find()
  .then((favouriteIds) => {
    favouriteIds = favouriteIds.map(favourite=>favourite.homeId.toString())
    Home.find().then((registeredHomes) => {
      const favHomes = registeredHomes.filter((home) =>
        favouriteIds.includes(home._id.toString())
      
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
  const homeId = req.body.id;
  Favourite.findOne({homeId:homeId})
  .then(existingFav=>{
    if(existingFav){
    return res.redirect("/favourites");
  
}
const fav = new Favourite({homeId:homeId});
return fav.save()
})
.then(()=>{
  res.redirect("/favourites");
})
.catch((err)=>{
  console.log('Error while adding to favourites',err)
})  
  
};

exports.postRemoveFromFavouriteList = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("came to reove fav",homeId)
  Favourite.findOneAndDelete({homeId:homeId})
  .then(()=>{
    res.redirect("/favourites");
  }) 
  .catch(()=>{
    console.log("error while removing from favourites", err);
  })
  
 
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
