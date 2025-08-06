// ## Reject a Promise

// - Create a Promise that immediately rejects with the message "Something went wrong!".
// - Handle the error using .catch().

const p = new Promise(function (_, reject) {
  reject("Something went wrong!");
});

p.catch((err) => console.error(err));
