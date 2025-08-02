function greet(name, cb) {
    console.log(`Hi ${name}`);
    setTimeout(() => cb(name), 2000);
}

greet("Vitor", function (name) {
    console.log(`Bye ${name}`);
});
