const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../utils/autopopulate");
var deepPopulate = require('mongoose-deep-populate')(mongoose);

const PostSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  subreddit: { type: String, required: true },
  author : { type: Schema.Types.ObjectId, ref: "User", required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

// Always populate the author field
PostSchema
  .pre('findOne', Populate('author'))
  .pre('find', Populate('author'))
  
PostSchema.plugin(deepPopulate);

module.exports = mongoose.model("Post", PostSchema);