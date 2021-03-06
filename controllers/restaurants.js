const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Reservation = require('../models/Reservation');
const Review = require('../models/Review');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

//@desc     Get all restaurants
//@route    GET /api/v1/restaurants
//@access   Public
exports.getAllRestaurants = asyncHandler(async (req, res, next) => {
  
  // Query all the restaurants
  const restaurants = await Restaurant.find({});

  res.status(200).json({
    success: true,
    count: restaurants.length,
    data: restaurants
  });
});

//@desc     Get all restaurants`
//@route    GET /api/v1/restaurants/:city
//@access   Public
exports.getAllRestaurantsById = asyncHandler(async (req, res, next) => {
  
  // Query the restaurants by Id
  // const restaurants = await Restaurant.find({"address.city": req.params.city});
  const restaurants = await Restaurant.findById(req.params.id)
  res.status(200).json({
    success: true,
    count: restaurants.length,
    data: restaurants
  });
});

exports.addRestaurant = asyncHandler(async (req, res, next) => {
  
  const isRestaurant = req.user.isRestaurant;

  if(!isRestaurant){
    return next(
      new ErrorResponse('You are not authorized to add a restaurant', 401)
    );
  }

  req.body.user = req.user.id;
  
  const restaurant = await Restaurant.create(req.body);
  res.status(201).json({ success: true, data: restaurant });
});



//@desc     Add a reservation to restaurant
//@route    GET /api/v1/restaurants/reservation/:restaurantId
//@access   Public
exports.addReservation =  asyncHandler(async (req, res, next) => {
  console.log(req.body)

  req.body.restaurant = req.params.id;
  
  const reservation = await Reservation.create(req.body);

  res.status(201).json({ success: true, data: reservation });
});



exports.getAllReservation =  asyncHandler(async (req, res, next) => {

  const reservations = await Reservation.find({"user": req.body.user});
  
  res.status(200).json({
    success: true,
    count: reservations.length,
    data: reservations
  });

});

exports.addEvent =  asyncHandler(async (req, res, next) => {

  req.body.user = req.user.id;

  const reservation = await Reservation.create(req.body);
  res.status(201).json({ success: true, data: reservation });
});

// exports.getAllEvents =  asyncHandler(async (req, res, next) => {

// });

exports.addReviewforRestaurant =  asyncHandler(async (req, res, next) => {

  req.body.restaurant = req.params.id;

  const review = await Review.create(req.body);

  res.status(200).json({ success: true, data: review });
});

exports.getAllReviewsforRestaurant =  asyncHandler(async (req, res, next) => {

  req.body.restaurant = req.params.id;
  const review = await Review.find({restaurant: req.params.id});
  res.status(200).json({ success: true, data: review });
});








