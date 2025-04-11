const mongoose = require("mongoose");

const favModel = require("./fav.model");


const  homeSchema = mongoose.Schema({
  houseName:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  location:{
    type:String,
    required:true
  },
  rating:{
    type:Number,
    // required:true
  },
  imageUrl:String,

   
},{
  timestamps:true
});

// homeSchema.pre('findOneAndDelete',async function(next){
//   const homeId = this.getQuery()["_id"];
//   await favModel.deleteMany({homeId:homeId});
//   next()
// });
module.exports = mongoose.model('Home',homeSchema)