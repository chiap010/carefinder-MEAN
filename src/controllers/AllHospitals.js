const Hospital = require("../models/Hospital");

module.exports = async function (req, res, method) {
      //console.log("body" + JSON.stringify(req.body));
      if (method === "GET") {
            await Hospital.find()
                  .exec()
                  .then((response) => res.status(200).json({ data: response }))
                  .catch((err) => res.status(400).json(err));
      } else if (method === "POST") {
            const post = new Hospital({
                  provider_id: req.body.provider_id,
                  hospital_name: req.body.hospital_name,
                  address: req.body.address,
                  city: req.body.city,
                  state: req.body.state,
                  zip_code: req.body.zip_code,
                  county_name: req.body.county_name,
                  phone_number: req.body.phone_number,
                  hospital_type: req.body.hospital_type,
                  hospital_ownership: req.body.hospital_ownership,
                  emergency_services: req.body.emergency_services,
                  latitude: req.body.latitude,
                  longitude: req.body.longitude,
            });
            try {
                  const savedPost = await post.save();
                  res.json(savedPost);
            } catch (err) {
                  res.status(400).json(err);
            }
      } else if (method === "DELETE") {
            try {
                  const removePost = await Hospital.remove();
                  res.status(200).json(removePost);
            } catch (err) {
                  res.status(400).json(err);
            }
      }
};
