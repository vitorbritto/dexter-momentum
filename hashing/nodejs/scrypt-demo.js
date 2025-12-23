import crypto from "node:crypto";

// Define the password
const password = "whoami";
const salt = "mydelicioussalt";

// Hash the password using scrypt
console.log("Hashing the password...");

try {
  const hash = crypto.scryptSync(password, salt, 64)
  
  // Log the hashed password as a base64 string
  console.log("Hashed password (base64):", hash.toString('base64'));
} catch (err) {
  console.error("Error hashing password:", err);
}