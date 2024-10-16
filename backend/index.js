require("dotenv").config();
const PORT = process.env.PORT;
const uri = process.env.DB_URL;

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const bookingRoutes = require('./routes/bookingRoutes');

async function connectDB() {
  await mongoose.connect(uri, {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
  });
  await mongoose.connection.db.admin().command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}

async function main() {
    const app = express();
    app.use(cookieParser());
    app.use(cors());
    app.use(bodyParser.json({ limit: '50mb' }));

    app.use('/api/bookings', bookingRoutes);

    const {initDB} = require("./sample/initdb")

    try {
      await connectDB();
      await initDB();
      app.listen(PORT, (req, res) => {
        console.log(
          `Successfully connected to the database and running on port ${PORT}`
        );
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  main()