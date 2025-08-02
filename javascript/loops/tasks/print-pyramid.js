// Generate a Pyramid Pattern using Nested Loop as it is shown below:

// ```bash
// *
// * *
// * * *
// * * * *
// * * * * *
// ```

function printPyramid(rows) {
  for (let i = 1; i <= rows; i++) {
    let pattern = "";
    for (let j = 1; j <= i; j++) {
      pattern += "* ";
    }
    console.log(pattern.trim());
  }
}

printPyramid(3);
