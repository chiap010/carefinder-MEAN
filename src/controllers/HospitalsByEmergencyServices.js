const Hospital = require("../models/Hospital");
const stringResources = require("../helpers/string-resources");

module.exports = async function (req, res) {
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
      } else if (hospitalQuery && hospitalQuery.length === 0) {
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
};
