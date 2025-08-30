const initApp = () => {
  const button = document.querySelector("button");
  button.addEventListener("click", throttle(showLog, 2000));
  // IMPORTANT: Do not need to use throttle. We can disable the button and enable it again after some time.
  // For request, we can pass a loading state until the data returned or fetch is complete.
};

const showLog = () => console.log("Clicked!");

document.addEventListener("DOMContentLoaded", initApp);

const throttle = (fn, delay) => {
  let lastTime = 0;

  console.log("Called throttle immediately");

  return (...args) => {
    const now = new Date().getTime();

    if (now - lastTime < delay) {
      return;
    }

    lastTime = now;

    fn(...args);
  };
};
