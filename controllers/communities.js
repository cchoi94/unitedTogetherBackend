const Community = require('../models/Community');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all communities
// @route   GET /api/v1/communities
// @access  Public

exports.getCommunities = async (req, res, next) => {
  let query;

  // Copy req.qury
  let reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gtw, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = Community.find(JSON.parse(queryStr));
  // query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const pagination = {};
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Community.countDocuments();

  query.skip(startIndex).limit(limit);

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  // Executing query
  try {
    const communities = await query;
    res.status(200).json({
      success: true,
      count: communities.length,
      pagination,
      data: communities,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single community
// @route   GET /api/v1/communties/:id
// @access  Public

exports.getCommunity = async (req, res, next) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      return next(
        new ErrorResponse(
          `Community not found with id of ${req.params.id}`,
          404
        )
      );
    }

    res.status(200).json({
      success: true,
      data: community,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create single community
// @route   POST /api/v1/communities
// @access  Public

exports.createCommunity = async (req, res, next) => {
  try {
    const community = await Community.create(req.body);
    console.log('req body ' + req.body);
    res.status(201).json({
      success: true,
      data: community,
    });
  } catch (err) {
    next(err);
  }
};

// // @desc    Update single bootcamps
// // @route   PUT /api/v1/bootcamps/:id
// // @access  Private

// exports.updateBootcamp = async (req, res, next) => {
//   try {
//     const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!bootcamp) {
//       return new ErrorResponse(
//         `Bootcamp not found with id of ${req.params.id}`,
//         404
//       );
//     }

//     res.status(200).json({ success: true, data: bootcamp });
//   } catch (err) {
//     next(err);
//   }
// };

// // @desc    Delete single bootcamps
// // @route   DELETE /api/v1/bootcamps/:id
// // @access  Private

// exports.deleteBootcamp = async (req, res, next) => {
//   try {
//     const bootcamp = await Bootcamp.findById(req.params.id);

//     if (!bootcamp) {
//       return new ErrorResponse(
//         `Bootcamp not found with id of ${req.params.id}`,
//         404
//       );
//     }

//     bootcamp.remove();

//     res.status(200).json({ success: true, data: {} });
//   } catch (err) {
//     next(err);
//   }
// };

// // @desc    Get bootcamps within a radius
// // @route   Get /api/v1/bootcamps/radius/:zipcode/:distance
// // @access  Private

// exports.getBootcampsInRadius = async (req, res, next) => {
//   const { zipcode, distance } = req.params;
//   try {
//     const loc = await geocoder.geocode(zipcode);
//     const lat = loc[0].latitude;
//     const lng = loc[0].longitude;

//     // Calc radius using radians
//     // Divide distance by radius of Earth
//     // Earth Radius = 3963 mi / 6378 km
//     const radius = distance / 3963;

//     const bootcamps = await Bootcamp.find({
//       location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
//     });

//     res.status(200).json({
//       success: true,
//       count: bootcamps.length,
//       data: bootcamps,
//     });
//   } catch (err) {
//     next(err);
//   }
// };
