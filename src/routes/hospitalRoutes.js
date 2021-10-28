const express = require("express");
const router = express.Router();

const Hospital = require("../models/Hospital");

// All hospitals
router.get("/", async (req, res) => {
      //res.send("test");
      try {
            // If nothing in the query string

            //if (!req.query) {
            const hospitalInfo = await Hospital.find();
            res.status(200).json(hospitalInfo);
            //res.send("test");
            //}
            // If something in the query string, lets read it out
            /*
            else {
                  if (req.query.city) {
                        const hospitalInfo = await Hospital.findById(
                              req.query.city
                        );
                        res.status(200).json(hospitalInfo);
                  }
            }
            */
      } catch (err) {
            res.json({ message: err });
            console.log(err);
      }
});

// 37:42 in Youtube video for POST
// TO-DO

module.exports = router;
