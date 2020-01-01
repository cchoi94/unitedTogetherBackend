const mongoose = require('mongoose');

const CommunitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a community name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [500, 'Name can not be more than 50 characters'],
    },
    // location: {
    //   // GeoJSON Point
    //   type: {
    //     type: String,
    //     enum: ['Point'],
    //     // required: true,
    //   },
    //   coordinates: {
    //     type: [Number],
    //     // required: true,
    //     index: '2dsphere',
    //   },
    //   formattedAddress: String,
    //   street: String,
    //   city: String,
    //   state: String,
    //   zipcode: String,
    //   country: String,
    // },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create bootcamp slug from name
CommunitySchema.pre('save', function() {
  console.log('pre saving model');
  next();
});

// Cascade delete courses when a bootcamp is deleted
// CommunitySchema.pre('remove', async function() {
//   await this.model('Course').deleteMany({ bootcamp: this._id });
//   next();
// });

// Geocode & create location field
// CommunitySchema.pre('save', async function(next) {
//   const loc = await geocoder.geocode(this.address);
//   this.location = {
//     type: 'Point',
//     coordinates: [loc[0].longitude, loc[0].latitude],
//     formattedAddress: loc[0].formattedAddress,
//     street: loc[0].streetName,
//     city: loc[0].city,
//     state: loc[0].stateCode,
//     city: loc[0].city,
//     country: loc[0].countryCode,
//   };

// Do not save address in DB
// this.address = undefined;
// next();
// });

// Reverse populate with virtuals
// CommunitySchema.virtual('channels', {
//   ref: 'Channel',
//   localField: '_id',
//   foreignField: 'community',
//   justOne: false,
// });

module.exports = mongoose.model('Community', CommunitySchema);
