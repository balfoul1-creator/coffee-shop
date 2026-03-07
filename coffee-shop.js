const http = require('http');
const { MongoClient } = require('mongodb');

// MongoDB connection
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
  const prices = { 
    espresso: 3, 
    latte: 4, 
    cappuccino: 4, 
    mocha: 5 
  };
  return (prices[coffeeType] || 0) * quantity;
}

// ✅ ADDED: Discount function for tests!
function applyDiscount(total) {
  if (total > 20) {
    return total * 0.9;  // 10% off over $20
  } else if (total > 10) {
    return total * 0.95; // 5% off over $10
  }
  return total;
}

// ✅ ADDED: Coffee type validator for tests!
function isValidCoffee(type) {
  const validTypes = ["espresso", "latte", "cappuccino", "mocha"];
  return validTypes.includes(type);
}

const server = http.createServer(async (req, res) => {
  const urlParts = req.url.split('/');
  
  // Show menu
  if (req.url === '/') {
    const menu = {
      espresso: 3,
      latte: 4,
      cappuccino: 4,
      mocha: 5,
      endpoints: {
        "/": "Menu",
        "/orders": "View all orders",
        "/order/:type/:quantity": "Place order (e.g., /order/latte/2)"
      }
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(menu, null, 2));
  }
  
  // View orders
  else if (req.url === '/orders') {
    const orders = await getOrders();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(orders, null, 2));
  }
  
  // Place order
  else if (urlParts[1] === 'order') {
    const coffeeType = urlParts[2];
    const quantity = parseInt(urlParts[3]);
    
    if (!coffeeType || !quantity || !isValidCoffee(coffeeType)) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Invalid order' }));
      return;
    }
    
    const order = await saveOrder({ coffee: coffeeType, quantity });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(order, null, 2));
  }
  
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

const PORT = 3000;

// ✅ FIXED: Only start server when run directly
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`☕ Coffee Shop running on port ${PORT}`);
    console.log(`📦 Database: ${DB_HOST}`);
    console.log(`📝 Try: http://localhost:3000/order/latte/2`);
  });
}

// ✅ EXPORT ALL functions for tests!
module.exports = { 
  saveOrder, 
  getOrders, 
  calculateBill, 
  applyDiscount,
  isValidCoffee
};