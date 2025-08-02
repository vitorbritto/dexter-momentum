// ## Calculate CTC with a Bonus
// Let's calculate how much you earn from your office.

// - [ ] You get 12,300 rupees as your monthly salary.
// - [ ] You get a 20% bonus on your annual salary.
// - [ ] How much money do you make per annum as a CTC?

function calculateCTC(monthlySalary, bonusPercent) {
  const annualSalary = monthlySalary * 12;
  const bonus = annualSalary * (bonusPercent / 100);
  const totalCTC = annualSalary + bonus;

  console.log(`Monthly Salary: ₹${monthlySalary}`);
  console.log(`Annual Salary (without bonus): ₹${annualSalary}`);
  console.log(`Bonus (${bonusPercent}%): ₹${bonus}`);
  console.log(`Total CTC per annum: ₹${totalCTC}`);
}

calculateCTC(12300, 20);
