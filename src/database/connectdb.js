import mongoose from "mongoose";

mongoose.connect(process.env.URI)
    .then(() => console.log('DB connected 🔥'))
    .catch((e) => console.log('Error connect to MongoDB' + e))