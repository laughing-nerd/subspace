const express = require("express");
const blogStatsRoute = require("./routes/blogStats.js");
const blogSearchRoute = require("./routes/blogSearch.js");
const defaultRoute = require("./routes/defaultRoute.js");

const app = new express();

//Routes
app.use("/api/blog-stats", blogStatsRoute);
app.use("/api/blog-search", blogSearchRoute);
app.use("/", defaultRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`);
})

