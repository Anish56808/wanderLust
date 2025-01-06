const express= require('express');
const mongoose= require("mongoose");
const app= express();
const Listing= require("./models/listing");
const methodOverride =require("method-override");
//const engine = require("ejs-mate");
const ejsMate = require("ejs-mate");
const wrapAsync = require('./utils/wrapAsync');
const ExpressError= require("./utils/ExpressError")

// way to require EJS file
const path= require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

let port=8080;
app.listen(8080,()=>{
    console.log("sever is listening to port",port);
});

// data base connection
let url= "mongodb://127.0.0.1:27017/wanderlust" ;
async function main() {
  await mongoose.connect(url);  
};
main()
.then((res)=>{
    console.log("conncted to DB");
}).catch((err)=>{
    console.log(err);
});

//test databse 
app.get("/testDB", wrapAsync(async (req,res)=>{
//    await Listing.deleteMany({});
    // let sampleListing = new Listing({
    //     title:"My New Villa",
    //     description : "By the beach",
    //     price:1200,
    //     location:"calangute, Goa",
    //     country:"India"
    // });

    // await sampleListing.save();
    console.log("sample was saved");
    res.send("successful testing");
}));

app.get("/test",(req,res)=>{
     res.send("this app is listening");
});

//home route
app.get("/",(req,res)=>{
     res.send("this is root")
});
// index route
app.get("/listings",wrapAsync(async(req,res)=>{
    const allListings= await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));

// new app create route
app.get("/listings/new",(req,res)=>{
    // res.send("working");
    res.render("listings/new.ejs");
});

//delete route
app.delete("/listings/:id",wrapAsync(async (req,res)=>{
    let id= req.params.id;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

// create route
app.post("/listings",wrapAsync(async(req,res)=>{
    
        let listing = await req.body.listing;
        const newListing = new Listing(listing);
        await newListing.save();
        res.redirect("/listings");
        console.log(listing);
 
}));
// edit route
app.get("/listings/:id/edit",wrapAsync(async (req,res)=>{
    const id = req.params.id;
    console.log(id);
    const listing=  await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

// update route
app.put("/listings/:id", wrapAsync(async (req,res)=>{
    let id = req.params.id;
   await Listing.findByIdAndUpdate(id,{...req.body.listing});
   res.redirect("/listings");
}));
// show route
app.get("/listing/:id",wrapAsync(async(req,res)=>{ 
    const {id} = req.params; 
    const listing = await Listing.findById(id); 
    res.render("listings/show.ejs",{listing}); 
}));

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"));
});

app.use((err, req, res, next) => {
    let { statusCode, message } = err;
    res.status(statusCode).send(message);
});
