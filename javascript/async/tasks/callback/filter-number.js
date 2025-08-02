function filterNumbers(list, condition) {
    const result = [];

    for (let i = 0; i < list.length; i++) {
        if (condition(list[i])) {
            result.push(list[i]);
        }
    }

    return result;
}

const filtered = filterNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9], function (n) {
    return n > 5;
});
