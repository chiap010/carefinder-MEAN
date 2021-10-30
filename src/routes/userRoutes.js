const express = require("express");
const { http400 } = require("../helpers/string-resources");
const router = express.Router();
const stringResources = require("../helpers/string-resources");
const User = require("../models/User");
const apikey = require("apikeygen").apikey;
const userHasReadPermission = require("../helpers/userHasReadPermission.js");
const userHasAdminPermission = require("../helpers/userHasAdminPermission.js");

router.get("/", async (req, res) => {
      let userPermission = "NONE";

      if (req.get("X-API-KEY") !== undefined) {
            apiKeyHeaderValue = req.get("X-API-KEY");
      }

      const userQuery = await User.find({ api_key: apiKeyHeaderValue }).exec();
      let authenticated = false;
      if (userQuery && userQuery.length === 1) {
            authenticated = true;

            if (userQuery[0].permission) {
                  userPermission = userQuery[0].permission;
            }
      }

      try {
            console.log(authenticated);
            console.log(userHasAdminPermission(userPermission));

            if (authenticated && userHasAdminPermission(userPermission)) {
                  if (Object.keys(req.query).length === 0) {
                        const userQuery = await User.find()
                              .exec()
                              .then((response) =>
                                    res.status(200).json({ data: response })
                              )
                              .catch((err) => res.status(401).json(err));
                  }
            } else {
                  res.status(401).json({
                        data: { error: stringResources.http401 },
                  });
            }
      } catch (err) {
            res.status(400).json({
                  data: { error: stringResources.http400 },
            });
      }
});

router.post("/", async (req, res) => {
      const apiKeyToUse = apikey();
      const post = new User({
            username: "chiapete",
            api_key: apiKeyToUse,
            permission: "ADMIN",
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
