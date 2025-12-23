import bcrypt from "bcrypt";

// Define the password
const password = "whoami";

// Hash the password
console.log("Hashing the password...");

// The 10 is the cost factor
// The higher the cost factor, the more secure the hash
// But it also takes more time to hash the password
const hash = await bcrypt.hash(password, 10);

// Log the hashed password
console.log("Hashed password:", hash);

// Compare the password with the hash
const isMatch = await bcrypt.compare(password, hash);

// Log the result
console.log("Is the password correct?", isMatch);