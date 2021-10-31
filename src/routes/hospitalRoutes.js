const express = require("express");
const { http400 } = require("../helpers/string-resources");
const router = express.Router();
const stringResources = require("../helpers/string-resources");
const userHasReadPermission = require("../helpers/userHasReadPermission.js");
const userHasAdminPermission = require("../helpers/userHasAdminPermission.js");

const Hospital = require("../models/Hospital");
const User = require("../models/User");

router.get("/", async (req, res) => {
      let apiKeyHeaderValue = "";

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
            if (authenticated && userHasReadPermission(userPermission)) {
                  // All hospitals
                  // If nothing in the query string
                  if (Object.keys(req.query).length === 0) {
                        const hospitalInfo = await Hospital.find()
                              .exec()
                              .then((response) =>
                                    res.status(200).json({ data: response })
                              )
                              .catch((err) => res.status(400).json(err));
                  }
                  // If something in the query string, lets read the query string and find accordingly
                  else {
                        // If city and state are part of the query string
                        if (req.query.city && req.query.state) {
                              const hospitalQuery = await Hospital.find({
                                    city: {
                                          $regex: req.query.city,
                                          $options: "i",
                                    },
                                    state: {
                                          $regex: req.query.state,
                                          $options: "i",
                                    },
                              }).exec();
                              if (hospitalQuery && hospitalQuery.length > 0) {
                                    res.status(200).json({
                                          data: hospitalQuery,
                                    });
                              } else if (
                                    hospitalQuery &&
                                    hospitalQuery.length === 0
                              ) {
                                    res.status(404).json({
                                          data: {
                                                error:
                                                      stringResources.http404 +
                                                      " - City: " +
                                                      req.query.city +
                                                      " - State: " +
                                                      req.query.state,
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

                        // If city name is part of the query string, but not state
                        else if (req.query.city && !req.query.state) {
                              const hospitalQuery = await Hospital.find({
                                    city: {
                                          $regex: req.query.city,
                                          $options: "i",
                                    },
                              }).exec();
                              if (hospitalQuery && hospitalQuery.length > 0) {
                                    res.status(200).json({
                                          data: hospitalQuery,
                                    });
                              } else if (
                                    hospitalQuery &&
                                    hospitalQuery.length === 0
                              ) {
                                    res.status(404).json({
                                          data: {
                                                error:
                                                      stringResources.http404 +
                                                      " - City: " +
                                                      req.query.city,
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
                        // If state is part of the query string, but not city
                        else if (req.query.state && !req.query.city) {
                              const hospitalQuery = await Hospital.find({
                                    state: {
                                          $regex: req.query.state,
                                          $options: "i",
                                    },
                              }).exec();
                              if (hospitalQuery && hospitalQuery.length > 0) {
                                    res.status(200).json({
                                          data: hospitalQuery,
                                    });
                              } else if (
                                    hospitalQuery &&
                                    hospitalQuery.length === 0
                              ) {
                                    res.status(404).json({
                                          data: {
                                                error:
                                                      stringResources.http404 +
                                                      " - State: " +
                                                      req.query.state,
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

                        // If county name is part of the query string
                        else if (req.query.county) {
                              const hospitalQuery = await Hospital.find({
                                    county_name: {
                                          $regex: req.query.county,
                                          $options: "i",
                                    },
                              }).exec();
                              if (hospitalQuery && hospitalQuery.length > 0) {
                                    res.status(200).json({
                                          data: hospitalQuery,
                                    });
                              } else if (
                                    hospitalQuery &&
                                    hospitalQuery.length === 0
                              ) {
                                    res.status(404).json({
                                          data: {
                                                error:
                                                      stringResources.http404 +
                                                      " - County: " +
                                                      req.query.county,
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

                        // If hospital name is part of the query string
                        else if (req.query.name) {
                              const hospitalQuery = await Hospital.find({
                                    hospital_name: {
                                          $regex: req.query.name,
                                          $options: "i",
                                    },
                              }).exec();
                              if (hospitalQuery && hospitalQuery.length > 0) {
                                    res.status(200).json({
                                          data: hospitalQuery,
                                    });
                              } else if (
                                    hospitalQuery &&
                                    hospitalQuery.length === 0
                              ) {
                                    res.status(404).json({
                                          data: {
                                                error:
                                                      stringResources.http404 +
                                                      " - Hospital Name: " +
                                                      req.query.name,
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

                        // If hospital type is part of the query string
                        else if (req.query.type) {
                              const hospitalQuery = await Hospital.find({
                                    hospital_type: {
                                          $regex: req.query.type,
                                          $options: "i",
                                    },
                              }).exec();
                              if (hospitalQuery && hospitalQuery.length > 0) {
                                    res.status(200).json({
                                          data: hospitalQuery,
                                    });
                              } else if (
                                    hospitalQuery &&
                                    hospitalQuery.length === 0
                              ) {
                                    res.status(404).json({
                                          data: {
                                                error:
                                                      stringResources.http404 +
                                                      " - Hospital Type: " +
                                                      req.query.type,
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

                        // If hospital ownership is part of the query string
                        else if (req.query.ownership) {
                              const hospitalQuery = await Hospital.find({
                                    hospital_ownership: {
                                          $regex: req.query.ownership,
                                          $options: "i",
                                    },
                              }).exec();
                              if (hospitalQuery && hospitalQuery.length > 0) {
                                    res.status(200).json({
                                          data: hospitalQuery,
                                    });
                              } else if (
                                    hospitalQuery &&
                                    hospitalQuery.length === 0
                              ) {
                                    res.status(404).json({
                                          data: {
                                                error:
                                                      stringResources.http404 +
                                                      " - Ownership: " +
                                                      req.query.ownership,
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

                        // If emergency services is part of the query string
                        else if (req.query.emergency) {
                              const hospitalQuery = await Hospital.find({
                                    emergency_services: {
                                          $regex: req.query.emergency,
                                          $options: "i",
                                    },
                              }).exec();
                              if (hospitalQuery && hospitalQuery.length > 0) {
                                    res.status(200).json({
                                          data: hospitalQuery,
                                    });
                              } else if (
                                    hospitalQuery &&
                                    hospitalQuery.length === 0
                              ) {
                                    res.status(404).json({
                                          data: {
                                                error:
                                                      stringResources.http404 +
                                                      " - Emergency Services: " +
                                                      req.query.emergency,
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

                        // If provider ID is part of the query string
                        else if (req.query.providerId) {
                              const hospitalQuery = await Hospital.find({
                                    provider_id: {
                                          $regex: req.query.providerId,
                                          $options: "i",
                                    },
                              }).exec();
                              if (hospitalQuery && hospitalQuery.length > 0) {
                                    res.status(200).json({
                                          data: hospitalQuery,
                                    });
                              } else if (
                                    hospitalQuery &&
                                    hospitalQuery.length === 0
                              ) {
                                    res.status(404).json({
                                          data: {
                                                error:
                                                      stringResources.http404 +
                                                      " - Provider ID: " +
                                                      req.query.providerId,
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

                        // If emergency services is part of the query string
                        else if (req.query.zipCode) {
                              const hospitalQuery = await Hospital.find({
                                    zip_code: {
                                          $regex: req.query.zipCode,
                                          $options: "i",
                                    },
                              }).exec();
                              if (hospitalQuery && hospitalQuery.length > 0) {
                                    res.status(200).json({
                                          data: hospitalQuery,
                                    });
                              } else if (
                                    hospitalQuery &&
                                    hospitalQuery.length === 0
                              ) {
                                    res.status(404).json({
                                          data: {
                                                error:
                                                      stringResources.http404 +
                                                      " - Zip Code: " +
                                                      req.query.zipCode,
                                          },
                                    });
                              } else {
                                    res.status(400).json({
                                          data: {
                                                error: stringResources.http400,
                                          },
                                    });
                              }
                        } else {
                              res.status(400).json({
                                    data: { error: stringResources.http400 },
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

// 37:42 in Youtube video for POST
// TO-DO

module.exports = router;
