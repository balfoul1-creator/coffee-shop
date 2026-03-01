// COFFEE SHOP - FIXED VERSION!

function calculateBill(coffeeType, quantity) {
  let price = 0;
  
  // Set prices
  if (coffeeType === "espresso") {
    price = 3;
   else if (coffeeType === "latte") {
    price = 5;  // BUG!.
  } else if (coffeeType === "cappuccino") {
    price = 4;
  } else if (coffeeType === "mocha") {
    price = 5;
  }
  
  // ✅ FIXED: Multiply instead of add
  let total = price * quantity;
  
  return total;
}

function applyDiscount(total) {
  // ✅ FIXED: Correct discount logic
  if (total > 20) {
    return total * 0.9;  // 10% off over $20
  } else if (total > 10) {
    return total * 0.95; // 5% off over $10
  }
  return total;
}

function isValidCoffee(type) {
  // ✅ FIXED: Include all coffee types
  const validTypes = ["espresso", "latte", "cappuccino", "mocha"];
  return validTypes.includes(type);
}

module.exports = { calculateBill, applyDiscount, isValidCoffee };

// Run if called directly
if (require.main === module) {
  console.log("☕ COFFEE SHOP MENU:");
  console.log("2 espressos: $" + calculateBill("espresso", 2));
  console.log("3 lattes: $" + calculateBill("latte", 3));
}
