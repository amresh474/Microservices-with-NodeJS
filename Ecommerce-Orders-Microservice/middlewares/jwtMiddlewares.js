const {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization,
  } = require("nodejs_ms_shared_library");
  
  // Wrap the middleware functions with their parameters
  // Verify token from the client
  const verifyTokenMiddleware = (req, res, next) => {
    verifyToken(req, res, next, process.env.JWT_SEC);
  };
  
  // Verify token and authorise account owner
  const verifyTokenAndAuthoriationMiddleware = (req, res, next) => {
    verifyTokenAndAuthorization(req, res, next, process.env.JWT_SEC);
  };
  
  // Verify token and authorise admin
  const verifyTokenAndAdminMiddleware = (req, res, next) => {
    verifyTokenAndAdmin(req, res, next, process.env.JWT_SEC);
  };
  
  module.exports = {
    verifyTokenAndAdminMiddleware,
    verifyTokenAndAuthoriationMiddleware,
    verifyTokenMiddleware,
  };