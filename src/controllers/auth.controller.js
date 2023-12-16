const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const { signToken } = require("../../utils/jwt");
const { User } = require("../models/user");
// const { Task } = require("../models/task");

async function signup(req, res, next) {
  try {
    const { firstname, lastname, username, email, password } = req.body;
    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
      return res
        .status(httpStatus.CONFLICT)
        .json({ status: false, message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User(
      firstname,
      lastname,
      username,
      email,
      hashedPassword
    );

    const values = await newUser.save();

    if (values) {
      return res
        .status(httpStatus.OK)
        .json({ status: true, message: "registered succesfully" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function signin(req, res, next) {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findUserByEmail(email);
    if (!existingUser) {
      const error = new Error("Either email or password is wrong");
      error.statusCode = 401;
      throw error;
    }

    const isValid = await bcrypt.compare(password, existingUser.password);
    if (!isValid) {
      const error = new Error("Either email or password is wrong");
      error.statusCode = 401;
      throw error;
    }
    //create access and refresh token
    const token = await signToken(
      { userId: existingUser.user_id },
      { expiresIn: "15m" }
    );
    //create cookies
    res.cookie("token", token, {
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      secure: true,
      httpOnly: true,
      sameSite: "strict",
    });
    //set headers
    res.setHeader("Authorization", `Bearer ${token}`);
    return res
      .status(httpStatus.OK)
      .json({ status: true, date: existingUser, token: token });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

// async function getUser(req, res, next) {
//   const userId = req.userId;
//   try {
//     const user = await User.findUserById(userId);
//     const tasks = await Task.getUserTasks(userId);
//     return res.status(httpStatus.OK).json({ status: true, user, tasks });
//   } catch (error) {
//     console.log(error.message);
//     next(error);
//   }
// }

async function logout(req, res, next) {
  res
    .clearCookie("token")
    .status(httpStatus.OK)
    .json({ status: true, message: "Signout success!" });
  res.setHeader("Authorization", "");
}

module.exports = {
  signup,
  signin,
  logout,
};
