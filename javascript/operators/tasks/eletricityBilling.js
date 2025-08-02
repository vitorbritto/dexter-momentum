// ## Create an Electricity Bill Calculator
// Let's calculate how much you pay for electricity bills per month and annually.

// - [ ] Create a `units` variable. Based on this value you will calculate the total electricity bill for a months.
// - [ ] If each day you consume the `units` and each unit cost 150 rupees, how much will you be charged per month?
// - [ ] If there is a 20% discount on the annual payment, how much will you be charged for an annual payment?

function calculateElectricityBill(unitsPerDay) {
  const costPerUnit = 150;
  const daysInMonth = 30;
  const monthsInYear = 12;

  const monthlyBill = unitsPerDay * costPerUnit * daysInMonth;
  const annualBill = monthlyBill * monthsInYear;
  const annualDiscount = annualBill * 0.2;
  const discountedAnnualBill = annualBill - annualDiscount;

  console.log(`Daily usage: ${unitsPerDay} units`);
  console.log(`Monthly bill: ₹${monthlyBill}`);
  console.log(`Annual bill (without discount): ₹${annualBill}`);
  console.log(`Annual discount (20%): ₹${annualDiscount}`);
  console.log(`Annual bill (with discount): ₹${discountedAnnualBill}`);
}

calculateElectricityBill(10);
