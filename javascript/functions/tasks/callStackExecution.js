// Create Call Stack Execution Diagram for this flow

function f1() {}
function f2() {
  f1();
}
f2();

/**
 *
 * sequenceDiagram
 *   participant G as Global Context
 *   participant F2 as f2()
 *   participant F1 as f1()
 *
 *   G->>+F2: invoke f2()
 *   note right of F2: Stack: [Global, f2]
 *
 *   F2->>+F1: invoke f1()
 *   note right of F1: Stack: [Global, f2, f1]
 *
 *   F1-->>-F2: return from f1()
 *   note left of F2: Stack: [Global, f2]
 *
 *   F2-->>-G: return from f2()
 *   note left of G: Stack: [Global]
 *
 **/
