const dotenv = require('dotenv');
let myEnv = dotenv.config();
const os = require('os');
const express = require("express");

const app = express();

app.use(express.json());

app.use('/status', function (req, res){
    res.status(200).send("Server is up and running");
})

const publisherRoute = require("./routes/publisher.route");
app.use('/publisher', publisherRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App is running on http://${os.hostname}:${PORT} `));