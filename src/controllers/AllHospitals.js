const Hospital = require("../models/Hospital");

module.exports = async function (req, res) {
      await Hospital.find()
            .exec()
            .then((response) => res.status(200).json({ data: response }))
            .catch((err) => res.status(400).json(err));
};
