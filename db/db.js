import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI)
.then(() => console.log("Database connection successful"))
.catch((err) => {
    console.error(error);
    process.exit(1);
}) 

// async function run() {
//   try {
//     await mongoose.connect(DB_URI);
//     await mongoose.connection.db.admin().command({ping: 1});

//     console.log("Database connection successful");
//   } catch(error) {
//     await mongoose.disconnect();
//     process.exit(1);
//   } 
//   finally {
    
//   }
// };
// run().catch(error => console.log(error));