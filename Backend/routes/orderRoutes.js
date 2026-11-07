const express = require("express");
const { createOrder, getOrderById } = require("../controllers/orderController");

const router = express.Router();

// There is deliberately no route that lists orders: they hold customers' names, phones and addresses.
router.post("/", createOrder);
router.get("/:id", getOrderById);

module.exports = router;
