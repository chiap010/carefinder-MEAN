const express = require("express");
const router = express.Router();

const Hospital = require("../models/Hospital");

// All hospitals
router.get("/", async (req, res) => {
      //res.send("test");
      try {
            // If nothing in the query string
            console.log("query length:  " + Object.keys(req.query).length);
            if (Object.keys(req.query).length === 0) {
                  const hospitalInfo = await Hospital.find();
                  res.status(200).json(hospitalInfo);
                  //res.send("test");
            }
            // If something in the query string, lets read it out
            else {
                  if (req.query.city) {
                        //const hospitalInfo = await Hospital.findById(req.query.city);
                        //res.status(200).json(hospitalInfo);

                        await Hospital.find({
                              city: { $regex: req.query.city, $options: "i" },
                        })
                              .exec()
                              .then((response) =>
                                    res.status(200).json(response)
                              )
                              .catch((err) =>
                                    errorHandler.createError(
                                          400,
                                          err.code,
                                          res,
                                          err.message
                                    )
                              );
                  }
            }
      } catch (err) {
            res.json({ message: err });
            console.log(err);
      }
});

// 37:42 in Youtube video for POST
// TO-DO

module.exports = router;
