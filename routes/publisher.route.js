const express = require("express");
const publisherController = require("../controllers/publisher.controller");

const router = express.Router();

router.post("/publish-message", publisherController.publisherMessage);

module.exports = router;