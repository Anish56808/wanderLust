const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description : String,
    // image:{
    //     type:String,
    //     default:"https://unsplash.com/photos/a-pile-of-dried-flowers-sitting-on-top-of-a-table-Ja8BXlezFYs",
    //     set : (v) =>
    //         v === ""
    //           ? "https://unsplash.com/photos/a-pile-of-dried-flowers-sitting-on-top-of-a-table-Ja8BXlezFYs"
    //           :v
    // },
    image:{
        url: {
            type: String,
            default: "https://unsplash.com/photos/a-pile-of-dried-flowers-sitting-on-top-of-a-table-Ja8BXlezFYs",
            set: (v) => v === "" ? "https://unsplash.com/photos/a-pile-of-dried-flowers-sitting-on-top-of-a-table-Ja8BXlezFYs" : v
        },
        filename: String
       },
    price:Number,
    location:String,
    country:String
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;
