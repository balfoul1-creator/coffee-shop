const http = require('http');

function calculateBill(coffeeType, quantity) {
  let price = 0;
  if (coffeeType === "espresso") price = 3;
  else if (coffeeType === "latte") price = 4;
  else if (coffeeType === "cappuccino") price = 4;
  else if (coffeeType === "mocha") price = 5;
  return price * quantity;
}

const server = http.createServer((req, res) => {
  const menu = {
    espresso: 3,
    latte: 4,
    cappuccino: 4,
    mocha: 5,
    message: "☕ Coffee Shop API"
  };
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(menu, null, 2));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`☕ Coffee Shop server running on port ${PORT}`);
});

module.exports = { calculateBill };