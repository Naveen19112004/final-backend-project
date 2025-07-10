// models/Video.model.js

const mongoose = require('mongoose');
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
const videoSchema = new mongoose.Schema({
  videoFile: {
    type: String,
    required: true // URL from cloud service (e.g., AWS, Cloudinary)
  },
  thumbnail: {
    type: String,
    required: true // URL of the thumbnail image
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  duration: {
    type: Number,
    required: true // Video length in seconds or minutes
  },
  views: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});
videoSchema.plugin(mongooseAggregatePaginate)
module.exports = mongoose.model('Video', videoSchema);
