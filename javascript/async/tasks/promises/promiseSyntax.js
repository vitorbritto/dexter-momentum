// Constructor
let p = new Promise(function (resolve, reject) {
  resolve();
  reject();
});

// Executor
// function(resolve, reject) {
// }

// States
//    Pending:
//    Fullfiled:
//    Rejected:

// Results
//    undefined: Initially when the state value is pending.
//    value: resolve(value)
//    error: reject(error)
