const express = require("express");
const { http400 } = require("../helpers/string-resources");
const router = express.Router();
const stringResources = require("../helpers/string-resources");
const APIKey = require("../models/APIKeys");
//const apikey = require("apikeygen").apikey;

router.post("/create", async (req, res) => {
      const post = new APIKey({
            username: "chiap010",
            api_key: "abcdefgh",
            privilege: 2,
      });
      try {
            const savedPost = await post.save();
            res.json({ data: savedPost });
            console.log("posted");
      } catch (err) {
            res.json({ error: err });
            console.log(err);
      }
});

module.exports = router;
