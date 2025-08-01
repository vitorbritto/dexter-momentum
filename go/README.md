# Go Lang

Go is a compiled, statically typed programming language with C-inspired syntax that is concise, safe, and efficient.

## Basic Fundamentals

### Variables

-   Variables are spaces in computer memory that store values.
-   Variables are created with the `:=` operator.
-   Variables are destroyed when they go out of scope.

### Dependencies

-   Install modules/dependencies: go install <module>.
-   Clean modules/dependencies: go tidy.

### Data Types

#### Number

-   Every number has an initial value equal to zero.
-   Integers: Can have 8, 16, 32, or 64 bytes.
-   Unsigned integers: Represented by uint (same byte scheme).
-   Reals (float):
    -   `float32`: Example, 123.45.
    -   `float64`: Example, 123000000.45.
-   Aliases:
    -   `int32` → `rune` (widely used in ASCII tables).
    -   `uint8` → `byte`.

#### String

-   Data type for texts.

#### Boolean

-   Values true or false.

### Functions

-   Create reusable blocks of code.
-   Private, protected, and public functions are differentiated by the first letter:
    -   Uppercase: Public function.
    -   Lowercase: Private function.

#### Anonymous Function

-   An anonymous function is a function without a name.

#### Named Function

-   A named function is a function with a name.

#### Variadic Function

-   Function that receives a variable number of arguments.

#### Recursive Function

-   Function that calls itself.

#### Init Function

-   Function that is executed before the main function.
-   Used to initialize variables or perform other configuration tasks.
-   Executed only once when the program starts.

### Operators

-   Arithmetic Operators: Mathematical operations.
-   Assignment Operators: Assign values to variables.
-   Comparison Operators: Compare values.
-   Logical Operators: Combine logical expressions.
-   Bitwise Operators: Bit-level manipulation.
-   Unary Operators: Work with a single operand.

### Arrays and Slices

-   **Array**:
    -   Collection of elements of the same type.
    -   Fixed size.
-   **Slice**:
    -   Dynamic array (with adjustable capacity).
    -   Reference to an array.
    -   Always has length and capacity.
    -   Automatically resizes when adding more elements than current capacity.

### Pointers

-   Variables that store the memory address of another variable.
-   Example:
    -   `*int`: Pointer to an integer.
    -   `&`: Operator to get the address.
    -   `*`: Operator to access the value at the address.

### Struct

-   A composite type that groups different data types.

### Maps

-   Data structure for storing key-value pairs.

### Control Structures

-   Conditional blocks like `if`, `for`, `switch`.

### Defer Clause

-   The Defer clause is useful for delaying the return of a code block until the last possible moment.

### Panic and Recover

-   Panic is used to interrupt program execution and display an error message.
-   Used to stop program execution and display an error message.
-   Recover is used to recover from a panic.
-   Used to interrupt the panic and continue program execution.
-   If the function is not in PANIC, RECOVER returns a `nil` (null) value
-   PANIC is not of Error type.

### Closure

-   A function that references a variable outside its body.
-   A function that returns another function.
-   Used to create a function that can be used to modify a variable.

## Advanced Fundamentals

### Methods

-   Methods are functions with a specific receiver.
-   The receiver is specified between the func keyword and the method name.
-   The receiver can be a value or a pointer.
-   The receiver is accessed by the type name followed by a dot.

### Interfaces

-   A type that defines a set of methods.
-   Used to implement polymorphism.
-   A way to ensure that a type implements a set of methods.
-   Establishes a contract.

## Concurrency vs Parallelism

-   Concurrency: The ability of a program to execute multiple tasks at the same time on a single processor. Tasks take turns executing.
-   Parallelism: The ability of a program to execute multiple tasks at the same time on different processors. Tasks are executed simultaneously.

### Concepts

-   **Goroutine:** A small lightweight routine that runs in parallel with the main program.
-   **Channel:** A way of communication between goroutines.
-   **Mutex:** A way to protect a resource shared by multiple goroutines.
-   **Context:** A way to manage HTTP requests and responses.

#### Go Routines

-   Go Routines are small lightweight routines that run in parallel with the main program.
-   Go Routines are used to execute multiple tasks at the same time.

#### WaitGroup

-   WaitGroup is a control structure that allows waiting for multiple goroutines.
-   WaitGroup is used to wait for multiple goroutines.

#### Channels

-   Channels are a way of communication between goroutines.
-   Channels are used to send and receive values between goroutines.
-   Channels are created with the `make` function.
-   Channels are closed with the `close` function.
-   **Deadlock:** An error that occurs when a goroutine waits for a channel that will never be sent. Only occurs during program execution. During compilation it's not possible to detect a deadlock.
-   Use channels in different functions or use with Buffer.

#### Select

-   Select is a control structure that allows waiting for multiple channels.
-   Select is used to wait for multiple channels.

#### Goroutines

-   Goroutines are small lightweight routines that run in parallel with the main program.
-   Goroutines are used to execute multiple tasks at the same time.

### Patterns

#### Worker Pools

-   Worker Pools is a concurrency pattern useful for handling the execution of a task queue.
-   Each task is executed by a worker.

#### Generators

-   Generator is a function that encapsulates a goroutine and a channel.

#### Multiplexing

-   Multiplexing is a technique that allows executing multiple tasks at the same time.

---

## Best Practices

-   Always use equal types when working with operators.
-   Define constants for fixed values.
-   Use implicit inference where applicable.
-   There are no ternary operators in Go.
-   Always use directories to organize the project.
-   Avoid using generic interfaces.
-   Always close a `channel` when it's no longer needed.

## Benefits

-   Strong typing ("Hulk" model): Prevents type errors.
-   Support for implicit inference for types.

## Considerations

-   No ternary operator.
-   Arrays have fixed size.
-   Slices have a pointer that references an array (equivalent to arrays in JavaScript).
-   Using "If init" limits variables to the scope of the if block.
-   Does the `defer` clause work like a Promise in JavaScript?
-   Does the pointer force us not to use data immutability? How far is it healthy to make copies of data?
