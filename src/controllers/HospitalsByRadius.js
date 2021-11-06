const Hospital = require("../models/Hospital");
const stringResources = require("../helpers/string-resources");

module.exports = async function (req, res) {
      const factor = 1609;
      const distanceInMeters = parseFloat(req.query.dist) * parseFloat(factor);

      // We need our distance value to meters from a miles value inputted through the query string.
      // MongoDB $near queries require the distance in meters.
      const hospitalQuery = await Hospital.find({
            geoloc: {
                  $near: {
                        $geometry: {
                              type: "Point",
                              coordinates: [req.query.lon, req.query.lat],
                        },
                        $maxDistance: distanceInMeters,
                  },
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
                              " - Within distance: " +
                              req.query.dist +
                              " miles of " +
                              req.query.lat +
                              ", " +
                              req.query.lon,
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
