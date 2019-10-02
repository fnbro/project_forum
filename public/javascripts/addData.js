

// //seed the database 

// require('dotenv').config();

// const mongoose = require("mongoose");
// const Team = require("../../models/team");
// const seeds = require("./seeds")

// mongoose
//   .connect(`mongodb+srv://Admin:Admin@cluster0-nxq1w.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true})
//   .then(x => {
//     console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
//   })
//   .catch(err => {
//     console.error('Error connecting to mongo', err)
//   });

// Team.insertMany(seeds).then(data => 
  
// mongoose.disconnect()
//   )
