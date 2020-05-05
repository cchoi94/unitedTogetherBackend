const stripe = require('stripe')(process.env.STRIPE_KEY);

// @desc    Get client secret
// @route   Get /api/v1/payment/secret
// @access  Public

exports.createSecret = async (req, res, next) => {
  try {
    const clientSecret = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'cad',
      metadata: { integration_check: 'accept_a_payment' },
    });

    res.status(200).json({
      success: true,
      clientSecret,
    });
  } catch (err) {
    next(err);
  }
};
