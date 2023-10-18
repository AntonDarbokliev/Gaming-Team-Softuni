const mongoose = require("mongoose");

const connectionString = process.env.DATABASE_CONNECTION_STRING ||  "mongodb://127.0.0.1:27017/Gaming-Team-Softuni"; 
//DON'T FORGET TO ALTER CONNECTION STRING FOR THE SPECIFIC EXERCISE

module.exports = async () => {
    try{
        await  mongoose.connect(connectionString, {
           useUnifiedTopology: true,
           useNewUrlParser: true,
         });
         console.log('Database connected');
    }catch(err){
        console.error('Error initializing database');
        process.exit(1)
    }
};
