const asyncHandler = require("express-async-handler"); // this handle the asynchronous code
const userModel = require("../model/userModel.js");
const { StatusCodes } = require("http-status-codes");
const { body, validationResult } = require("express-validator");

// get all the users
const getUser = asyncHandler(async (req, res) => {
  const userData = await userModel.find(); // this find all the data from the record
  if (!userData) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "unable to fetch user information",
      data: userData,
    });
  }
  return res
    .status(StatusCodes.OK)
    .json({ message: "UserData Fetched Successfully", data: userData });
});
// get single user by id

const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await userModel.findById({ _id: id });
    res
      .status(StatusCodes.OK)
      .json({ message: "User Data Found", data: singleUser });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.NOT_FOUND).json({
      message: "User not found",
      data: null,
    });
  }
});

//create a user
const createUser = [
  // this is performing validation
  body("email").trim().isEmail().withMessage("Email is required"),
  body("name").trim().isLength({ min: 3 }).withMessage("Name is required"),
  body("age")
    .isInt({ min: 18 })
    .withMessage("Age must be positive or above 18"),
  asyncHandler(async (req, res) => {
    // this handle the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: errors.array(),
        message: "invalid data",
      });
    }

    const { name, email, age } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).json({
        error: "Email already exists",
      });
    }

    try {
      const userCreate = await userModel.create({
        name: name,
        email: email,
        age: age,
      });
      if (!userCreate)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Failed to create user", data: null });

      return res
        .status(StatusCodes.CREATED)
        .json({ message: "User created successfully", data: userCreate });
    } catch (error) {
      console.error(error);
    }
  }),
];

// const updateUser = asyncHandler(async (req, res) => {

// })

// delete user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await userModel.findByIdAndDelete({ _id: id });
    res.status(StatusCodes.OK).json({
      message: "Data Deleted",
      data: deleteUser,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_GATEWAY).json({
      message: "Data not Deleted",
      data: null,
    });
  }
});

//update user
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(StatusCodes.OK).json({
      message: "Data updated",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.NOT_IMPLEMENTED).json({
      message: " Data not updated",
      data: null,
    });
  }
});

module.exports = {
  getUser,
  createUser,
  getSingleUser,
  deleteUser,
  updateUser,
};
