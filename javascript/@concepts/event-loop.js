console.log("Start");

setTimeout(() => {
  console.log("Timeout callback (macrotask)");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise callback (microtask)");
});

console.log("End");

/*
  Event Loop Diagram: 

  Call Stack:
  - console.log("Start")
  - console.log("End");

  Microtask Queue:
  - Promise callback (microtask)

  Macrotask Queue:
  - Timeout callback (macrotask)

  Event Loop:
  - Check Microtask Queue
  - Check Macrotask Queue
  - Execute Microtask Queue
  - Execute Macrotask Queue
  - Repeat

  Output:
  - Start
  - Promise callback (microtask)
  - Timeout callback (macrotask)
  - End
*/


/**

- Call Stack / Stack
- Web APIs — ✅ (browser term).
What it is: host-provided async sources (e.g., setTimeout, DOM events, fetch, rAF).
Node.js: libuv + C++ bindings (timers, I/O, etc.), not called “Web APIs”.
	•	Callback Queue — ✅ but better named Task Queue or Message Queue.
Also hear: Macrotask Queue.
Examples: setTimeout, setInterval, DOM events, postMessage, setImmediate (Node).
	•	MicroTask Queue / Job Queue — ✅ spelling usually Microtask (one word).
Also hear: Promise Jobs, Microtask queue.
Examples: Promise.then/catch/finally, queueMicrotask, MutationObserver, process.nextTick (Node has a special, higher-priority microtask queue for nextTick).
	•	Event Loop — ✅ ties it all together.
Rule of thumb: run one task (macrotask) → drain all microtasks → (render; in browsers requestAnimationFrame callbacks run before paint on the next frame).

Quick mapping (browser):
	•	Macrotask: setTimeout, DOM events → Task Queue
	•	Microtask: Promise.then, queueMicrotask, MutationObserver → Microtask Queue
	•	Render cycle: requestAnimationFrame before paint; microtasks are drained before rendering.

Quick mapping (Node.js):
	•	Macrotask phases: timers → pending callbacks → poll (I/O) → check (setImmediate) → close.
	•	Microtasks: process.nextTick (runs before other microtasks), then Promise microtasks after each phase tick.

*/



function f1() {
  console.log('f1')
}

function f2() {
  console.log('f2')
}

function main() {
  console.log('main')
  
  setTimeout(f1, 0)
  
  f2()
}

main()