const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.set("view engine","ejs");;
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
}

main().then(() => {
    console.log("connection successfull");
})
.catch((err) => {
    console.log(err);
});

app.listen(8080,() => {
    console.log("server is listening to port 8080");
});

app.get("/",(req,res) => {
    res.send("HOME");
});

//INDEX ROUTE
app.get("/listings", async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

app.get("/listings/new", (req,res) => {
    res.render("listings/new.ejs");
});

//SHOW ROUTE 
app.get("/listings/:id", async (req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

app.post("/listings",async (req,res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

//UPDATE ROUTE
app.get("/listings/:id/edit",async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

app.put("/listings/:id", async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});

app.delete("/listings/:id", async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findByIdAndDelete(id);
    console.log(listing);
    res.redirect("/listings");
})

// app.get("/testlisting",async (req,res) => {
//     let sampleListing = new Listing({
//         title: "Tara Bhawan",
//         description: "Apartment",
//         price: 1200,
//         location: "Howrah, West Bengal",
//         country: "India",
//     });
//     await sampleListing.save().catch((err) => console.log(err));
//     console.log("data saved to db");
//     res.send("test succesfull");
// });