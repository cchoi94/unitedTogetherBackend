const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema(
  {
    donor: {
      type: String,
      required: [true, `Please add the donor's name`],
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
    amount: {
      type: Number,
      required: [true, 'Please add donation amount'],
      maxlength: [500, 'Name can not be more than 50 characters'],
    },
    hospital: {
      type: String,
      required: [true, `Please enter a hospital`],
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, `Please enter an email`],
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
    newsletter: {
      type: Boolean,
      required: [true, `No newsletter preference`],
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
    healthcareRef: {
      type: String,
      required: [false, `Please enter a healthcare ref`],
      default: ``,
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
    healthcareContact: {
      type: String,
      required: [false, `Please the healthcare contact information`],
      default: ``,
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
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
// DonationSchema.pre('save', function() {
//   console.log('pre saving model');
//   next();
// });

// Cascade delete courses when a bootcamp is deleted
// DonationSchema.pre('remove', async function() {
//   await this.model('Course').deleteMany({ bootcamp: this._id });
//   next();
// });

// Geocode & create location field
// DonationSchema.pre('save', async function(next) {
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
// DonationSchema.virtual('channels', {
//   ref: 'Channel',
//   localField: '_id',
//   foreignField: 'community',
//   justOne: false,
// });

module.exports = mongoose.model('Donation', DonationSchema);
