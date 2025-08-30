const initApp = () => {
  const button = document.querySelector("button");
  button.addEventListener("click", () => {
    showLog();
    button.disabled = true;
    setTimeout(() => (button.disabled = false), 2000);
  });
  // IMPORTANT: Do not need to use debounce. We can disable the button and enable it again after some time.
  // For request, we can pass a loading state until the data returned or fetch is complete.
};

// debounce(showLog, 2000)

const showLog = () => console.log("Clicked!");

document.addEventListener("DOMContentLoaded", initApp);

const debounce = (fn, delay) => {
  let id;

  console.log(`ID at immediate load: ${id}`);

  return (...args) => {
    console.log(`Previous ID: ${id}`);

    if (id) {
      clearTimeout(id);
    }

    id = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
