const fs= require('fs')
const path = require('path')
const rootDir = require('../utils/pathUtils')
const { root } = require('postcss')
// let registeredHomes = []
module.exports =class Home{
    constructor(houseName,price,location,rating,imageUrl){
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.imageUrl =imageUrl;
    }
    save(){
        this.id=Math.random().toString()
        Home.fetchAll((registeredHomes)=>{
            registeredHomes.push(this);
            const homeDataPath = path.join(rootDir,'data','homes.json');
            fs.writeFile(homeDataPath,JSON.stringify(registeredHomes),error=>{
                console.log("File Writing concluded",error)
            })
        })
        
    }
    static fetchAll(callback){
        const homeDataPath = path.join(rootDir,'data','homes.json');
        fs.readFile(homeDataPath,(err,data)=>{
            console.log("File read",err,data)
            callback(!err? JSON.parse(data):[])
          
   
        })
        
    }
}