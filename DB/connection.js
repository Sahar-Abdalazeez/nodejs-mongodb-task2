const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connectDB = async () => {
    return await mongoose.connect("mongodb://127.0.0.1:27017/Notes")
        .then((result) => {
        console.log('connected database');
        })
        .catch((error) => {
            console.log(`error,${error}`)
    })
}

module.exports = connectDB;