const { calculateBill, applyDiscount, isValidCoffee } = require('./coffee-shop.js');

console.log("🔍 TESTING COFFEE SHOP...");
console.log("=========================");

// TEST 1: Espresso price
console.log("\n📝 TEST 1: 2 espressos should be $6");
let result = calculateBill("espresso", 2);
if (result === 6) {
  console.log("✅ PASSED! Got $" + result);
} else {
  console.log(`❌ FAILED! Got $${result}, expected $6`);
}

// TEST 2: Latte price
console.log("\n📝 TEST 2: 3 lattes should be $12");
result = calculateBill("latte", 3);
if (result === 12) {
  console.log("✅ PASSED! Got $" + result);
} else {
  console.log(`❌ FAILED! Got $${result}, expected $12`);
}

// TEST 3: Cappuccino price
console.log("\n📝 TEST 3: 2 cappuccinos should be $8");
result = calculateBill("cappuccino", 2);
if (result === 8) {
  console.log("✅ PASSED! Got $" + result);
} else {
  console.log(`❌ FAILED! Got $${result}, expected $8`);
}

// TEST 4: Mocha price
console.log("\n📝 TEST 4: 3 mochas should be $15");
result = calculateBill("mocha", 3);
if (result === 15) {
  console.log("✅ PASSED! Got $" + result);
} else {
  console.log(`❌ FAILED! Got $${result}, expected $15`);
}

// TEST 5: Discount over $20
console.log("\n📝 TEST 5: $30 order with discount");
let total = calculateBill("latte", 8); // 8 lattes = $32
let discounted = applyDiscount(total);
if (discounted === 28.8) {  // $32 - 10% = $28.8
  console.log("✅ PASSED! Got $" + discounted);
} else {
  console.log(`❌ FAILED! Got $${discounted}, expected $28.8`);
}

// TEST 6: Discount over $10
console.log("\n📝 TEST 6: $15 order with discount");
total = calculateBill("latte", 4); // 4 lattes = $16 (but with BUG might be different)
discounted = applyDiscount(total);
if (discounted === 15.2) {  // $16 - 5% = $15.2
  console.log("✅ PASSED! Got $" + discounted);
} else {
  console.log(`❌ FAILED! Got $${discounted}, expected $15.2`);
}

// TEST 7: Valid coffee types
console.log("\n📝 TEST 7: Check valid coffee types");
if (isValidCoffee("espresso") === true && 
    isValidCoffee("latte") === true &&
    isValidCoffee("cappuccino") === true &&
    isValidCoffee("mocha") === true) {
  console.log("✅ PASSED! All types recognized");
} else {
  console.log("❌ FAILED! Some coffee types not recognized");
}

console.log("\n📊 TESTING COMPLETE!");
