const express = require('express');
const router = express.Router();
const adminAuthController = require("../controllers/adminAuthController");

router.get("/",adminAuthController.adminLogin);

module.exports = router;