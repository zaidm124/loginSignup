const asyncHandler = require("../../middlewares/asyncHandler");

exports.registerCompany = asyncHandler(async (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "Successfully registered company",
  });
});

exports.allCompanies = asyncHandler(async (req, res, next) => {
  return res.status(200).json({
    success: true,
    companies: ["one", "two", "three"],
  });
});

exports.updateCompany = asyncHandler(async (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "Company updated",
  });
});

exports.deleteCompany = asyncHandler(async (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "Company deleted",
  });
});
