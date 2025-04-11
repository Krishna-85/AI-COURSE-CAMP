import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";

import { connectDB } from "./src/database/db.js";
connectDB();
const port = process.env.PORT ; 


app.listen(port, () => {    
  console.log(`Server is running on port ${port}`);
});