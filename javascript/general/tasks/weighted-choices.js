const data = [
    ['Option 1', 3],
    ['Option 2', 7],
];

let output = [];

for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i][1]; j++) {
        output.push(data[i][0]);
    }
}

const result = output[Math.floor(Math.random() * output.length)];

console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - ');
console.log('Resultado: ', result);
console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - ');