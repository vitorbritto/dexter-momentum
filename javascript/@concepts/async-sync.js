// ------------------------------------------------------
// ASYNC AND SYNC
// ------------------------------------------------------

// Synchronous (Sync) Example:
// In synchronous code, tasks are executed one after another. Each task waits for the previous one to finish.

function syncExample() {
  console.log("1. Start fetching data (sync)");
  // Simulate a synchronous data fetch (blocking)
  for (let i = 0; i < 1e9; i++) {} // Just a delay loop
  console.log("2. Data fetched (sync)");
  console.log("3. Continue with next task (sync)");
}

syncExample();

// Asynchronous (Async) Example:
// In asynchronous code, tasks can start and finish at different times. The program doesn't wait for the async task to finish before moving on.

function asyncExample() {
  console.log("1. Start fetching data (async)");
  // Simulate async data fetch using setTimeout (non-blocking)
  setTimeout(() => {
    console.log("2. Data fetched (async)");
  }, 2000);
  console.log("3. Continue with next task (async)");
}

asyncExample();

// Real-world async example using fetch (in browsers):
// Fetch is asynchronous and returns a Promise.

async function fetchData() {
  console.log("Fetching data from API...");
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    const data = await response.json();
    console.log("Data received:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  console.log("Fetch complete.");
}

fetchData();

/*
Output (syncExample):
1. Start fetching data (sync)
2. Data fetched (sync)
3. Continue with next task (sync)

Output (asyncExample):
1. Start fetching data (async)
3. Continue with next task (async)
2. Data fetched (async)   <-- appears after 2 seconds

Output (fetchData):
Fetching data from API...
Data received: {userId: 1, id: 1, title: "...", body: "..."}
Fetch complete.
*/
