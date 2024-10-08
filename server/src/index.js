const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const port = 3000;

//database
require("./database");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "fdslajfsnfdsjsdaclcdsmcdskmsmmdsl",
    resave: true,
    saveUninitialized: true,
  }),
);

// routes
app.use("/admin", require("./routes/admin"));
app.use("/waitlist", require("./routes/waitlist"));

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
