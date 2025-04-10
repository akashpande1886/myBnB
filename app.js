const express = require("express");
const connectDB =require ('./db/index.js')
const path = require("path");
const hostRouter = require("./routes/hostRouter.js");
const storeRouter = require("./routes/storeRouter.js");
const rootDir = require("./utils/pathUtils.js");
const  errorController  = require("./controllers/errors.controller.js");
const app = express();
const dotenv =require( 'dotenv')
dotenv.config({
  path: './.env'
})
app.set("view engine", "ejs"); //ejs is used to render html files
app.set("views", "views");//views is the folder where the html files are stored

app.use(express.static(path.join(rootDir, "public")));

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use(express.urlencoded()); //as bodyparser

app.use("/host", hostRouter);
app.use(storeRouter);

app.use(errorController.pageNotFound);
// const PORT = 8000;
// app.listen(PORT, () => {
//   console.log(`Server running on address http://localhost:${PORT}`);
// });
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port  http://localhost:${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGODB conncetion failed!!!" , err)
})
