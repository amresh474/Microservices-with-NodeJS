const { Orders } = require("../models"); // Adjust the path accordingly
const { generateOrderId } = require("../utils/orderIdGenerator");
// Create a new order
const createOrder = async (req, res) => {
  try {
    const order = await Orders.create({
      orderId: generateOrderId(),
      ...req.body,
    });
    res.status(201).json({
      order,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    console.log(req.user, "u");
    const orders = await Orders.findAll();
    const ordersWithParsedProducts = orders.map((order) => {
      return {
        ...order.toJSON(),
        products: JSON.parse(order.products),
      };
    });

    res.status(200).json({
      user: req.user,
      orders: ordersWithParsedProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a specific order by orderId
const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Orders.findOne({
      where: { orderId },
    });
    if (order) {
      res.status(200).json({
        user: req.user,
        order,
      });
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an order by orderId
const updateOrderById = async (req, res) => {
  const { orderId } = req.params;
  try {
    const [updatedCount, updatedOrders] = await Orders.update(req.body, {
      where: { orderId },
      returning: true,
    });
    if (updatedCount > 0) {
      res.status(200).json({ user: req.user, orders: updatedOrders[0] });
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an order by orderId
const deleteOrderById = async (req, res) => {
  const { orderId } = req.params;
  try {
    const deletedCount = await Orders.destroy({
      where: { orderId },
    });
    if (deletedCount > 0) {
      res.status(200).json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};