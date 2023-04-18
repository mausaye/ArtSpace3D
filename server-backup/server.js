const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5001;
// app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");

const corsOption = {
    origin: `http://localhost:5001`
}

app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.json({ message: "Welcome to ArtSpace." });
  });
  
app.listen(port, async () => {
    // perform a database connection when server starts
    await dbo.connectToServer(function (err) {
        if (err) console.error(err);
    }
);

console.log(`Server is running on port: ${port}`);
});

