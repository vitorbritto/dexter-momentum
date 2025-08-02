// ## Write a program for the Traffic Light Simulation.
// Red Light... Green Light... Let's Play!

// - [ ] Create a `color` variable.
// - [ ] Based on the color variable's value print in the console if a traveller needs to STOP or GO. The Red color is for STOP and the Green color is for GO.

function trafficLightAction(color) {
  if (color.toLowerCase() === "red") {
    console.log("STOP");
  } else if (color.toLowerCase() === "green") {
    console.log("GO");
  } else {
    console.log("Invalid color");
  }
}

// Testes
trafficLightAction("red"); // STOP
trafficLightAction("green"); // GO
trafficLightAction("yellow"); // Invalid color
