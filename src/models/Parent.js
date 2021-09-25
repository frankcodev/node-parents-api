const { Schema, model} = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const ParentSchema = new Schema(
  {
    description: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
  },
  { timestamps: true }
);
ParentSchema.plugin(mongoosePaginate);

module.exports = model("Parent", ParentSchema);
