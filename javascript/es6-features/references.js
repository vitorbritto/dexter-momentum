// =============================
// References
// =============================

// Const
const a = 1;
const b = 2;


// Let
let count = 1;

if (true) {
    count += 1;
}

console.log(count);

// Block-scoped
{
  let a = 1;
  const b = 1;
}
console.log(a);
console.log(b);
