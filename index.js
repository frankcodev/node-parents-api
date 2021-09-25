const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require('./src/config/database');
const { parentsChildrenSeed } = require('./src/config/seed')
require('dotenv').config()

const authRoutes = require('./src/routes/authRoutes')
const parentRoutes = require('./src/routes/parentRoutes')
const childrenRoutes = require('./src/routes/childrenRoutes')

connectDB();
parentsChildrenSeed();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use("/", authRoutes);
app.use("/parents", parentRoutes);
app.use("/children", childrenRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running!");
});
