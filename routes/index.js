const express = require("express");
const router = express.Router();

const URL = require("../models/url");
const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;

// generate random code for shortener URL
const randomID = require("../utils/randomID");
const id = require("../utils/id");

// route setting
router.get("/", (req, res) => {
  res.render("index");
});

// original url setting
router.post("/submit", (req, res) => {
  // if user submit nothing
  if (!req.body.url) return res.redirect("/");
  const { url } = req.body;
  URL.findOne({ url })
    .then((url_check) => {
      if (url_check) {
        // check if shortener URL is repeated
        res.redirect(`/result/${id(url_check.url_shortened)}`);
      } else {
        // if not repeated, generate new one
        let url_end = randomID();
        URL.create({ url, url_shortened: `${HOST}/${url_end}` });
        res.redirect(`/result/${url_end}`);
      }
    })
    .catch((error) => console.log(error));
});

// shortner url setting
router.get("/result/:id", (req, res) => {
  const id = req.params.id;
  URL.findOne({ url_shortened: { $regex: id } }, "url url_shortened")
    .lean()
    .then((url) => res.render("result", { url }))
    .catch((error) => console.log(error));
});

// url website setting
router.get("/:id", (req, res) => {
  const id = req.params.id;
  URL.findOne({ url_shortened: { $regex: id } }, "url url_shortened")
    .lean()
    .then((url) => res.redirect(url.url))
    .catch((error) => console.log(error));
});

// export router module
module.exports = router;
