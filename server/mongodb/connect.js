import mongoose from "mongoose";

const connectDB = (url) => {
    
    // set search functionality:
    mongoose.set('strictQuery', true);

    // connect with database:
    mongoose.connect(url)
        .then(() => console.log('Mongoose Deez Ballz :^)'))
        .catch((err) => console.log(err));
};

export default connectDB;