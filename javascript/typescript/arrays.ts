// Plain / Flat arrays
const carMakersNotInitialized: string[] = [];
const carMakersAlreadyInitialized = ['ford', 'toyota', 'chevy'];

// Multidimensional arrays
const carsByMakersNotInitialized: string[][] = [];
const carsByMakersAlreadyInitialized = [
    ['f250'],
    ['corolla'],
    ['camaro']
];

// Inference with extracted values
const selectedCar = carMakersAlreadyInitialized[0];
const myCar = carMakersAlreadyInitialized.pop();

// Prevent incorrect values
carMakersAlreadyInitialized.push(123);

// Mapping
carMakersAlreadyInitialized.map((car: string) => {
    return car.toUpperCase();
});

// Flexible types
const importantDates: (Date | string)[] = [new Date()];

importantDates.push('2030-10-10');
importantDates.push(new Date());
importantDates.push(100);