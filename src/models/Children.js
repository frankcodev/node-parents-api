const { Schema, model} = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const ChildrenSchema = new Schema(
  {
    name: { type: String, required: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'Parent'},
  },
  { timestamps: true }
);
ChildrenSchema.plugin(mongoosePaginate);

module.exports = model("Children", ChildrenSchema);
