import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connection from "./config/database.js";
import users from "./routes/route.users.js";
//import products from "./routes/route.products.js";

dotenv.config();
connection.connect((err) => {
  if (err) {
    console.log("Error connecting to Database");
    return;
  }
});

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/users", users);
//app.use("/products", products);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
