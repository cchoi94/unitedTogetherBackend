const mongoose = require('mongoose');

const ChannelSchema = new mongoose.Schema(
  {
    messages: [],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create bootcamp slug from name
ChannelSchema.pre('save', function() {
  console.log('pre saving model');
  next();
});

// Cascade delete courses when a bootcamp is deleted
// ChannelSchema.pre('remove', async function() {
//   await this.model('Course').deleteMany({ bootcamp: this._id });
//   next();
// });

// Geocode & create location field
// ChannelSchema.pre('save', async function(next) {
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
// ChannelSchema.virtual('channels', {
//   ref: 'Channel',
//   localField: '_id',
//   foreignField: 'community',
//   justOne: false,
// });

module.exports = mongoose.model('Channel', ChannelSchema);
