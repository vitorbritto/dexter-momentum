// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// BUFFER
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-


const buffer = Buffer.from('Hello')
buffer
buffer.toString()

// Under the hood, a Node.js Buffer is a very similar to Uint8Array.

// 📦 Why use Buffer in Node?
// 	•	File reading/writing (fs)
// 	•	TCP/UDP streams (net, dgram)
// 	•	Binary protocol parsing (e.g. protobuf, PNG)

// 🧩 In Browser JavaScript:

// The native Buffer class doesn’t exist. Instead, you use:
// 	•	ArrayBuffer → Raw binary data
// 	•	TypedArray or DataView → Views over ArrayBuffer

// They serve the same purpose: to read/write binary data efficiently.

const clientBuffer = new ArrayBuffer(10)
clientBuffer.byteLength
const newClientBuffer = clientBuffer.slice(5)
newClientBuffer.byteLength
