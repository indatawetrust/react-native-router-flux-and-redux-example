/**
 * Draw schema
 *
 * @member Draw.schema
 */

const mongoose = require('mongoose'),
     Schema   = mongoose.Schema,
     ObjectId = Schema.Types.ObjectId

const PostSchema = new Schema({
  title : String,
  text: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

exports.PostSchema = mongoose.model('Post', PostSchema, 'post')
