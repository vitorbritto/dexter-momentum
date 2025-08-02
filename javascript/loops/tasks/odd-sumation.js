// ## 3. Find the summation of all odd numbers between 1 to 500 and print them on teh console log.

function oddSummation() {
  let sum = 0;

  for (let i = 1; i <= 500; i += 2) {
    sum += i;
  }

  console.log("Sum of all odd numbers from 1 to 500 is:", sum);
}

oddSummation();
