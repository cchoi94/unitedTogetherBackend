const express = require('express');
const router = express.Router();
const {
  getCommunity,
  getCommunities,
  createCommunity,
  // updateBootcamp,
  // deleteBootcamp,
} = require('../controllers/communities');

// Include other resouce routers
// const courseRouter = require('./courses');

// Re-route into other resource routers
// router.use('/:bootcampId/courses', courseRouter);

router
  .route('/')
  .get(getCommunities)
  .post(createCommunity);

router.route('/:id').get(getCommunity);
// .put(updateBootcamp)
// .delete(deleteBootcamp);

module.exports = router;
