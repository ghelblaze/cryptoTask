const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = 8000;
const app = express();
require("dotenv").config();

app.use(cors({ credentials: true, origin: "http://localhost:8000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

require("./config/config");
require("./routes/users.routes")(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));
