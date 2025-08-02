// ## Max of Three Numbers
// Find the max number from the lot.

// - [ ] Take three numbers and assign them to variables p, q, and r.
// - [ ] Now find the maximum of these three numbers using the comparison operators.

function findMaxOfThree(p, q, r) {
  let max;

  if (p >= q && p >= r) {
    max = p;
  } else if (q >= p && q >= r) {
    max = q;
  } else {
    max = r;
  }

  console.log(`The maximum of ${p}, ${q}, and ${r} is ${max}`);
}

findMaxOfThree(15, 27, 19); // The maximum of 15, 27, and 19 is 27
