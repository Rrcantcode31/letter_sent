const express = require("express");
const router = express.Router();

// Redirect root URL (/) to /main
router.get("/", (req, res) => {
    res.redirect("/main");
});

// Render main page
function viewMain(req, res) {
    res.render("main"); // No leading slash or .hbs extension
}
router.get("/main", viewMain);

// Render message page
function viewMessage(req, res) {
    res.render("message"); // Fixed leading slash
}
router.get("/message", viewMessage);

module.exports = router;