const express = require("express");
const { http400 } = require("../helpers/string-resources");
const router = express.Router();
const stringResources = require("../helpers/string-resources");

const Hospital = require("../models/Hospital");

router.get("/", async (req, res) => {
      try {
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
                        await Hospital.find({
                              city: { $regex: req.query.city, $options: "i" },
                              state: { $regex: req.query.state, $options: "i" },
                        })
                              .exec()
                              .then((response) =>
                                    res.status(200).json({ data: response })
                              )
                              .catch((err) => res.status(400).json(err));
                  }

                  // If city name is part of the query string
                  else if (req.query.city && !req.query.state) {
                        await Hospital.find({
                              city: { $regex: req.query.city, $options: "i" },
                        })
                              .exec()
                              .then((response) =>
                                    res.status(200).json({ data: response })
                              )
                              .catch((err) => res.status(400).json(err));
                  } else if (req.query.state && !req.query.city) {
                        /*
                  if (req.query.state && !req.query.city) {
                        await Hospital.find({
                              state: { $regex: req.query.state, $options: "i" },
                        })
                              .exec()
                              .then((response) => {
                                    res.status(200).json({ data: response });
                              })
                              .catch((err) => res.status(400).json(err));
                  }
                  */
                        const hospitalQuery = await Hospital.find({
                              state: { $regex: req.query.state, $options: "i" },
                        }).exec();
                        if (hospitalQuery && hospitalQuery.length > 0) {
                              res.status(200).json({ data: hospitalQuery });
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
                                          error: http400,
                                    },
                              });
                        }
                  }

                  // If county name is part of the query string
                  else if (req.query.county) {
                        await Hospital.find({
                              county_name: {
                                    $regex: req.query.county,
                                    $options: "i",
                              },
                        })
                              .exec()
                              .then((response) =>
                                    res.status(200).json({ data: response })
                              )
                              .catch((err) => res.status(400).json(err));
                  }

                  // If hospital name is part of the query string
                  else if (req.query.name) {
                        await Hospital.find({
                              hospital_name: {
                                    $regex: req.query.name,
                                    $options: "i",
                              },
                        })
                              .exec()
                              .then((response) =>
                                    res.status(200).json({ data: response })
                              )
                              .catch((err) => res.status(400).json(err));
                  }

                  // If hospital type is part of the query string
                  else if (req.query.type) {
                        await Hospital.find({
                              hospital_type: {
                                    $regex: req.query.type,
                                    $options: "i",
                              },
                        })
                              .exec()
                              .then((response) =>
                                    res.status(200).json({ data: response })
                              )
                              .catch((err) => res.status(400).json(err));
                  }

                  // If hospital ownership is part of the query string
                  else if (req.query.ownership) {
                        await Hospital.find({
                              hospital_ownership: {
                                    $regex: req.query.ownership,
                                    $options: "i",
                              },
                        })
                              .exec()
                              .then((response) =>
                                    res.status(200).json({ data: response })
                              )
                              .catch((err) => res.status(400).json(err));
                  }

                  // If emergency services is part of the query string
                  else if (req.query.emergency) {
                        await Hospital.find({
                              emergency_services: {
                                    $regex: req.query.emergency,
                                    $options: "i",
                              },
                        })
                              .exec()
                              .then((response) =>
                                    res.status(200).json({ data: response })
                              )
                              .catch((err) => res.status(400).json(err));
                  } else {
                        res.status(400).json({
                              data: {
                                    error: stringResources.http400,
                              },
                        });
                  }
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
