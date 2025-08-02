function task1(callback) {
    console.log("Task 1 is done!");
    callback();
}

function task2(callback) {
    console.log("Task 2 is done!");
    callback();
}

function task3(callback) {
    console.log("Task 3 is done!");
    callback();
}

task1(() => task2(() => task3(() => console.log("All tasks are done!"))));
