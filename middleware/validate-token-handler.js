const jwt = require("jsonwebtoken");

const asynchandler = require("express-async-handler");

const validateToken = asynchandler(async (req, res, next) => {
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Unauthorized user");
      }
      req.user = decoded;
      next();
    });
  }
  else {
    res.status(401);
    throw new Error("Access denied : No token provided");
  }
});

module.exports = validateToken;
