const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY;

module.exports = {
  registerUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      const userToken = jwt.sign(
        { id: newUser._id, email: newUser.email },
        SECRET,
        { expiresIn: "10d" }
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
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: "user not found" });
    }
    try {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      console.log(req.body.password);
      console.log(user.password);
      console.log(isPasswordValid);
      if (!isPasswordValid) {
        res.status(400).json({ error: "invalid mail or or password" });
      } else {
        const userToken = jwt.sign(
          { id: user._id, email: user.email },
          SECRET,
          { expiresIn: "10d" }
        );
        res
          .status(201)
          .cookie("userToken", userToken, { httpOnly: true })
          .json({ msg: "user Logged" });
      }
    } catch (error) {
      res.status(500).json({ error: "invalid mail // password" });
    }
  },
  logoutUser: (req, res) => {
    res.clearCookie("userToken");
    res.json({ msg: "logout!" });
  },
  fetchFavorites: async (req, res) => {
    const userId = req.userId;
    try {
      const user = await User.findById(userId);
      return res.status(200).json(user.favorites);
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  },
  addToFavorites: async (req, res) => {
    const { coinId } = req.body;
    const userId = req.userId;
    console.log("userid:", userId);
    try {
      const user = await User.findById(userId);
      console.log("user data:", user);
      console.log("favorites before push:", user.favorites);

      if (user.favorites.includes(coinId)) {
        return console.log("coin already exist in favorites");
      }

      user.favorites.push(coinId);
      await user.save();
      res.json({
        message: userId,
        success: true,
        favorites: user.favorites,
      });
      console.log(user.favorites);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: userId });
    }
  },
  deleteFavCoin: async (req, res) => {
    const { coinId } = req.body;
    const userId = req.userId;
    console.log(coinId);
    try {
      const user = await User.findById(userId);
      console.log(user);
      user.favorites.splice(user.favorites.indexOf(coinId), 1);
      console.log(user.favorites);
      user.save();

      return res.status(200).json("Coin removed");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  getFavorites: async (req, res) => {
    const userId = req.userId;
    const user = await User.findById(userId);
    try {
      if (user.favorites.length == 0) {
        return "You don't have Favorite coins yet";
      } else {
        res.json(user.favorites);
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: "Error while loading Favorites" });
    }
  },
};
