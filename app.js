require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const error = require("./middlewares/error");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "static")));

mongoose
  .connect(process.env.CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

    app.use("/api/v1/auth", require("./routes/auth.route"));
    app.use("/api/v1/menus", require("./routes/menu.route"));

    app.use(error);
  })
  .catch((err) => console.log(err));
