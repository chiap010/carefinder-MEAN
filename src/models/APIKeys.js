const mongoose = require("mongoose");
const schema = mongoose.Schema;

const schemaOptions = {
      timestamp: true,
};

const ApiKeySchema = new schema({
      username: { type: String },
      api_key: { type: String },
      privilege: { type: Number },
});

const sch = new mongoose.Schema(ApiKeySchema, schemaOptions);

module.exports = mongoose.model("api_keys", sch);
