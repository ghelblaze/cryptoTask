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
        .cookie("userToken", userToken, { httpOnly: false })
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
          .cookie("userToken", userToken, { httpOnly: false })
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
    const { coinId } = req.body;
    const userId = req.userId;
    console.log("userid:", userId);
    try {
      // Find the user by ID in the database
      const user = await User.findById(userId);
      console.log("user data:", user);
      console.log("coind id:", coinId);
      console.log("favorites before push:", user.favorites);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      if (!user.favorites.includes(coinId)) {
        return console.log("coin doesnt already exsit in favorites");
      }

      user.favorites.push(coinId);
      console.log("favorites.user after push", user.favorites);
      await user.save();
      res.json({
        message: userId,
        success: true,
        favorites: user.favorites,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: userId });
    }
  },
};
