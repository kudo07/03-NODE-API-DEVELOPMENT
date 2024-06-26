import asyncHandler from 'express-async-handler';
import Brand from '../model/Brand.model.js';
// 1
// @desc    Create new Brand
// @route   POST /api/v1/brands
// @access  Private/Admin

export const createBrandCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  // brand exist
  const brandFound = await Brand.findOne({ name });
  console.log(brandFound);
  if (brandFound) {
    throw new Error('Brand already exists');
  }
  //   create
  const brand = await Brand.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });
  res.json({
    status: 'success',
    message: 'Brand created Successfullly',
    brand,
  });
});

// 2
// @desc    Get single brand
// @route   GET /api/brands/:id
// @access  Public
export const getSingleBrandCtrl = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  res.json({
    status: 'success',
    message: 'brand fetched successfully',
    brand,
  });
});
// 3
// @desc    Get all brands
// @route   GET /api/brands
// @access  Public

export const getAllBrandsCtrl = asyncHandler(async (req, res) => {
  const brands = await Brand.find();
  res.json({
    status: 'success',
    message: 'Brands fetched successfully',
    brands,
  });
});
// 4
// @desc    Update brand
// @route   PUT /api/brands/:id
// @access  Private/Admin
export const updateBrandCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //   update
  const brand = await Brand.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );
  res.json({
    status: 'success',
    message: 'brand updated successfullt',
    brand,
  });
});
// 5
// @desc    delete brand
// @route   DELETE /api/brands/:id
// @access  Private/Admin
export const deleteBrandCtrl = asyncHandler(async (req, res) => {
  await Brand.findByIdAndDelete(req.params.id);
  res.json({
    status: 'success',
    message: 'brand deleted successgfully',
  });
});
