// ## 6. Write a Function to Capitalize the First Letter of Each Word in a Sentence
// Write a function capitalizeWords(sentence) that takes a sentence and capitalizes the first letter of each word. You can use the toUpperCase() method of string to convert the lowercase to uppercase.

function capitalizeWords(sentence) {
  if (typeof sentence !== "string") {
    console.error("capitalizeWords(sentence): sentence must be a string");
  }

  return sentence
    .split(" ")
    .map((word) => {
      if (word.length === 0) return "";
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");
}

capitalizeWords("hello world"); // "Hello World"
capitalizeWords("  multiple   spaces here  "); // "  Multiple   Spaces Here  "
capitalizeWords("javaScript is fun."); // "JavaScript Is Fun."
