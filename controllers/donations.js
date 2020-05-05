const Donation = require('../models/Donation');

// @desc    Create Donation
// @route   Post /api/v1/Donation
// @access  Public

exports.createDonation = async (req, res, next) => {
  try {
    const donation = await Donation.create(req.body);

    res.status(201).json({
      success: true,
      donation,
    });
  } catch (err) {
    next(err);
  }
};
