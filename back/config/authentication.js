const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token.replace("Bearer ", ""), "crypto_task", (err, user) => {
    if (err) return res.status(403).json({ error: "Forbidden" });

    req.user = user; // Attach the user object to the request
    next();
  });
};

module.exports = authenticateToken;
