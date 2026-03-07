const { MongoClient } = require('mongodb');

// Get connection details from environment
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'admin';
const DB_PASS = process.env.DB_PASS || 'password123';

const url = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:27017`;
const dbName = 'coffeeshop';

let client = null;

async function connectDB() {
  if (!client) {
    client = new MongoClient(url);
    await client.connect();
    console.log('✅ Connected to MongoDB');
  }
  return client.db(dbName);
}

async function saveOrder(order) {
  const db = await connectDB();
  const orders = db.collection('orders');
  
  order.timestamp = new Date();
  order.total = calculateBill(order.coffee, order.quantity);
  
  const result = await orders.insertOne(order);
  return { ...order, _id: result.insertedId };
}

async function getOrders() {
  const db = await connectDB();
  const orders = db.collection('orders');
  return await orders
    .find()
    .sort({ timestamp: -1 })
    .limit(10)
    .toArray();
}

function calculateBill(coffeeType, quantity) {
  const prices = { espresso: 3, latte: 4, cappuccino: 4, mocha: 5 };
  return (prices[coffeeType] || 0) * quantity;
}

module.exports = { saveOrder, getOrders, calculateBill };
