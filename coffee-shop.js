const http = require('http');

function calculateBill(coffeeType, quantity) {
  let price = 0;
  if (coffeeType === "espresso") price = 3;
  else if (coffeeType === "latte") price = 4;
  else if (coffeeType === "cappuccino") price = 4;
  else if (coffeeType === "mocha") price = 5;
  return price * quantity;
}

function applyDiscount(total) {
  if (total > 20) {
    return total * 0.9;  // 10% off over $20
  } else if (total > 10) {
    return total * 0.95; // 5% off over $10
  }
  return total;
}

function isValidCoffee(type) {
  const validTypes = ["espresso", "latte", "cappuccino", "mocha"];
  return validTypes.includes(type);
}

const server = http.createServer((req, res) => {
  const menu = {
    espresso: 3,
    latte: 4,
    cappuccino: 4,
    mocha: 5,
    message: "☕ Coffee Shop API - Ready to serve!",
    endpoints: {
      "/": "This menu",
      "/order/:type/:quantity": "Place an order (coming soon)"
    }
  };
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(menu, null, 2));
});

// ✅ FIXED: Server only starts when file is run directly
if (require.main === module) {
  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`☕ Coffee Shop server running on port ${PORT}`);
    console.log(`📝 Try it: http://localhost:${PORT}`);
  });
}

module.exports = { calculateBill, applyDiscount, isValidCoffee };// Testing Docker Hub token
