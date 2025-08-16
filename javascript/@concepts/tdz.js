// Temporal Dead Zone (TDZ)
// TDZ is the period of time between the declaration of a variable and its initialization where it cannot be accessed.

console.log("Demonstrating Temporal Dead Zone (TDZ) with let and const:");

try {
  console.log(myLet); // ReferenceError (let is hoisted but not initialized)
  let myLet = 20;
  console.log(myLet);
} catch (e) {
  console.log("Error with let:", e);
}

try {
  console.log(myConst); // ReferenceError (const is hoisted but not initialized)
  const myConst = 30;
  console.log(myConst);
} catch (e) {
  console.log("Error with const:", e);
}

// Example inside a block
console.log("\nTDZ inside a block:");
{
  // TDZ starts here for blockLet
  try {
    console.log(blockLet); // ReferenceError
  } catch (e) {
    console.log("Block TDZ error:", e.message);
  }
  let blockLet = "I'm declared after access attempt";
  console.log("blockLet after declaration:", blockLet);
}
