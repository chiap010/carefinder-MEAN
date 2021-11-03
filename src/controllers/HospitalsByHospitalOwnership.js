const Hospital = require("../models/Hospital");
const stringResources = require("../helpers/string-resources");

module.exports = async function (req, res) {
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
      } else if (hospitalQuery && hospitalQuery.length === 0) {
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
};
