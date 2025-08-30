// Higher Order Functions are Pure Functions

const oneToFive = [1,2,3,4,5]
console.log(oneToFive)

const oddToFive = oneToFive.filter(elm => elm % 2 !== 0)
console.log(oddToFive)

const doubled = oneToFive.map(elm => elm * 2)
console.log(doubled)

const summed = oneToFive.reduce((acc, elm) => acc + elm)
console.log(summed)

