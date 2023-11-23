const UsersController = require("../controllers/users.controller");
const { authenticate } = require("../config/jwt.config");
const { authenticateToken } = require("../config/authentication");

module.exports = (app) => {
  app.get("/api/users", authenticate, UsersController.findAll);
  app.post("/api/register", UsersController.registerUser);
  app.post("/api/login", UsersController.loginUser);
  app.get("/api/logout", UsersController.logoutUser);
  app.post("/api/addToFavorites", authenticate, UsersController.addToFavorites);
};
