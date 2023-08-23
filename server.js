const dotenv = require("dotenv");
dotenv.config("./.env");

const mongoose = require("mongoose");

const app = require("./app");


const Database = process.env.DB_URL.replace(
  "<password>",
  process.env.DB_PASSWORD
);
mongoose
  .connect(Database)
  .then(() => console.log("Successfullt connected to the DB!"))
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Listening on port:${process.env.PORT}`);
});
