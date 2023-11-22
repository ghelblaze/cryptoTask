const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY;

module.exports = {
  findAll: (req, res) => {
    User.find()
      .then((allUsers) => res.json(allUsers))
      .catch((err) => res.status(400).json(err));
  },
  registerUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      const userToken = jwt.sign(
        { id: newUser._id, email: newUser.email },
        SECRET,
        { expiresIn: "1d" }
      );
      res
        .status(201)
        .cookie("userToken", userToken, { httpOnly: true })
        .json({ message: "user Created" });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  loginUser: async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({ error: "invalid mail and password" });
    }
    try {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordValid) {
        res.statut(400).json({ error: "invalid mail or password" });
      } else {
        const userToken = jwt.sign(
          { id: user._id, email: user.email },
          SECRET,
          { expiresIn: "1d" }
        );
        res
          .status(201)
          .cookie("userToken", userToken, { httpOnly: true })
          .json({ msg: "user Logged" });
      }
    } catch (error) {
      res.status(400).json({ error: "invalid mail / password" });
    }
  },
  logoutUser: (req, res) => {
    res.clearCookie("userToken");
    res.json({ msg: "logout!" });
  },
  addToFavorites: async (req, res) => {
    const { userId, coinId } = req.body;

    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { favorites: coinId } },
        { new: true }
      );

      res.json(user.favorites);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
