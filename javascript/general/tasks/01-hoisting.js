// greetingUser(); // undefined()

// var greetingUser = function greetings() {
//     console.log("Hello!");
// };

// EC
//     GEC
//         CP:
//             greetingUser: undefined
//             greetings: "0xA432r32T" (heap)
//         EP:
//             greetingUser: Execute
//             [CRASH]
//     FEC
//         CP:
//         EP:

var greetingUser = function greetings() {
    console.log("Hello!");
};

greetingUser();

// EC
//     GEC
//         CP:
//             greetingUser: undefined
//             greetings: "0xA432r32T" (heap)
//         EP:
//             greetingUser: Execute
//     FEC
//         CP:
//             ---
//         EP:
//             greetings: Execute
