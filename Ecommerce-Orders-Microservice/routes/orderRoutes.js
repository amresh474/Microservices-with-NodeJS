const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById,
  } = require("../controllers/orderController");
  const {
    verifyTokenMiddleware,
    verifyTokenAndAuthoriationMiddleware,
    verifyTokenAndAdminMiddleware,
  } = require("../middlewares/jwtMiddlewares");
  const router = require("express").Router();
  
  // Create new order
  router.post("/", verifyTokenMiddleware, createOrder);
  
  // Get all orders
  router.get("/", verifyTokenAndAdminMiddleware, getAllOrders);
  
  // Get order by id
  router.get("/:orderId", verifyTokenMiddleware, getOrderById);
  
  // Update order by id
  router.put("/:orderId", verifyTokenAndAuthoriationMiddleware, updateOrderById);
  
  // Delete order by id
  router.delete("/:orderId", verifyTokenAndAdminMiddleware, deleteOrderById);
  
  module.exports = router;