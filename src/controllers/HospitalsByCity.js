const Hospital = require("../models/Hospital");
const stringResources = require("../helpers/string-resources");

module.exports = async function (req, res, method) {
      if (method === "GET") {
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
            } else if (hospitalQuery && hospitalQuery.length === 0) {
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
      } else if (method === "DELETE") {
            try {
                  const removePost = await Hospital.deleteMany({
                        city: {
                              $regex: req.query.city,
                              $options: "i",
                        },
                  });
                  res.status(200).json(removePost);
            } catch (err) {
                  res.status(400).json(err);
            }
      }
};
