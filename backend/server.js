const express = require("express");
const routes = require("./routes/productRoute");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({ origin: process.env.HOST }));
app.use(express.static("Images"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("./DB/connection");

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});

app.use("/api/auth", routes);
