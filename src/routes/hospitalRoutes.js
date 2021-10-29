const express = require("express");
const router = express.Router();

const Hospital = require("../models/Hospital");

router.get("/", async (req, res) => {
      try {
            // All hospitals
            // If nothing in the query string

            if (Object.keys(req.query).length === 0) {
                  const hospitalInfo = await Hospital.find();
                  res.status(200).json(hospitalInfo);
            }
            // If something in the query string, lets read the query string and find accordingly
            else {
                  // If city name is part of the query string

                  // TO DOs-- needs 404s
                  if (req.query.city && !req.query.state) {
                        await Hospital.find({
                              city: { $regex: req.query.city, $options: "i" },
                        })
                              .exec()
                              .then((response) =>
                                    res.status(200).json(response)
                              )
                              .catch((err) => res.status(400).json(err));
                  }

                  // If state is part of the query string
                  if (req.query.state && !req.query.city) {
                        await Hospital.find({
                              state: { $regex: req.query.state, $options: "i" },
                        })
                              .exec()
                              .then((response) =>
                                    res.status(200).json(response)
                              )
                              .catch((err) => res.status(400).json(err));
                  }

                  // If county name is part of the query string
                  if (req.query.county) {
                        await Hospital.find({
                              county_name: {
                                    $regex: req.query.county,
                                    $options: "i",
                              },
                        })
                              .exec()
                              .then((response) =>
                                    res.status(200).json(response)
                              )
                              .catch((err) => res.status(400).json(err));
                  }

                  // If hospital name is part of the query string
                  if (req.query.name) {
                        await Hospital.find({
                              hospital_name: {
                                    $regex: req.query.name,
                                    $options: "i",
                              },
                        })
                              .exec()
                              .then((response) =>
                                    res.status(200).json(response)
                              )
                              .catch((err) => res.status(400).json(err));
                  }

                  // If hospital type is part of the query string
                  if (req.query.type) {
                        await Hospital.find({
                              hospital_type: {
                                    $regex: req.query.type,
                                    $options: "i",
                              },
                        })
                              .exec()
                              .then((response) =>
                                    res.status(200).json(response)
                              )
                              .catch((err) => res.status(400).json(err));
                  }

                  // If hospital ownership is part of the query string
                  if (req.query.ownership) {
                        await Hospital.find({
                              hospital_ownership: {
                                    $regex: req.query.ownership,
                                    $options: "i",
                              },
                        })
                              .exec()
                              .then((response) =>
                                    res.status(200).json(response)
                              )
                              .catch((err) => res.status(400).json(err));
                  }

                  // If emergency services is part of the query string
                  if (req.query.emergency) {
                        await Hospital.find({
                              emergency_services: {
                                    $regex: req.query.emergency,
                                    $options: "i",
                              },
                        })
                              .exec()
                              .then((response) =>
                                    res.status(200).json(response)
                              )
                              .catch((err) => res.status(400).json(err));
                  }

                  // If city and state are part of the query string
                  if (req.query.city && req.query.state) {
                        await Hospital.find({
                              city: { $regex: req.query.city, $options: "i" },
                              state: { $regex: req.query.state, $options: "i" },
                        })
                              .exec()
                              .then((response) =>
                                    res.status(200).json(response)
                              )
                              .catch((err) => res.status(400).json(err));
                  }
            }
      } catch (err) {
            res.status(400).json({ message: err });
      }
});

// 37:42 in Youtube video for POST
// TO-DO

module.exports = router;
