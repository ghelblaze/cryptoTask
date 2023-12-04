const UsersController = require("../controllers/users.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.post("/api/register", UsersController.registerUser);
  app.post("/api/login", UsersController.loginUser);
  app.get("/api/logout", authenticate, UsersController.logoutUser);
  app.post("/api/addToFavorites", authenticate, UsersController.addToFavorites);
  app.get("/api/favorites", authenticate, UsersController.getFavorites);
  app.get("/api/fetchfavorites", authenticate, UsersController.fetchFavorites);
};
