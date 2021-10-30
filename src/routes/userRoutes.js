const express = require("express");
const { http400 } = require("../helpers/string-resources");
const router = express.Router();
const stringResources = require("../helpers/string-resources");
const User = require("../models/User");
const apikey = require("apikeygen").apikey;

router.post("/create", async (req, res) => {
      const apiKeyToUse = apikey();
      const post = new User({
            username: "chiapete",
            api_key: apiKeyToUse,
            privilege: 2,
            createdTs: Date.now,
      });
      try {
            const savedPost = await post.save();
            res.json({ data: savedPost });
      } catch (err) {
            res.json({ error: err });
            console.log(err);
      }
});

module.exports = router;
