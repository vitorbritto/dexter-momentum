// Pay for your movie ticket
// Imagine, the INOX charges ticket prices based on age:
// - Children (<18 years): $3
// - Adults (18 - 60 years): $10
// - Seniors (60+ years): $8

// Write a program that prints the ticket price based on the person’s age.

function ticketAmount(personAge) {
  if (personAge < 18) {
    console.log(`Ticket: $3`);
    return;
  }
  if (personAge <= 60) {
    console.log(`Ticket: $10`);
    return;
  }
  console.log(`Ticket: $8`);
}

ticketAmount(15);
ticketAmount(30);
ticketAmount(65);
