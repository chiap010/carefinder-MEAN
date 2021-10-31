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
      let apiKeyHeaderValue = "";

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
            console.log(req.query.key);

            if (authenticated && userHasAdminPermission(userPermission)) {
                  if (Object.keys(req.query).length === 0) {
                        const userQuery = await User.find().exec();
                        if (userQuery && userQuery.length > 0) {
                              res.status(200).json({
                                    data: userQuery,
                              });
                        } else if (userQuery && userQuery.length === 0) {
                              res.status(404).json({
                                    data: {
                                          error:
                                                stringResources.http404 +
                                                " - Returned no API user accounts.",
                                    },
                              });
                        } else {
                              res.status(400).json({
                                    data: {
                                          error: stringResources.http400,
                                    },
                              });
                        }
                  } else if (req.query.key) {
                        const userQuery = await User.find({
                              api_key: req.query.key,
                        }).exec();

                        if (userQuery && userQuery.length > 0) {
                              res.status(200).json({
                                    data: userQuery,
                              });
                        } else if (userQuery && userQuery.length === 0) {
                              res.status(404).json({
                                    data: {
                                          error:
                                                stringResources.http404 +
                                                " - Returned no API user accounts.",
                                    },
                              });
                        } else {
                              res.status(400).json({
                                    data: {
                                          error: stringResources.http400,
                                    },
                              });
                        }
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
