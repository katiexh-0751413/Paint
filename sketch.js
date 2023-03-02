let c = "black";
let eraserMode = false;
let slider = 10; // initial size of pen and eraser

function setup() {
  createCanvas(600, 400);
  background(255);

  // Draw a black outline around the canvas
  noFill();
  stroke(0);
  strokeWeight(1);
  rect(0, 0, width, height);

  // Add a menu bar
  fill(200);
  rect(0, 0, width, 40);

  // Add a "Save" button to the menu bar
  fill(255);
  rect(width-60, 5, 50, 30);
  fill(0);
  textSize(12);
  textAlign(CENTER, CENTER);
  text("Save", width-35, 20);

  // Add a "Clear" button to the menu bar
  fill(255);
  rect(10, 5, 50, 30);
  fill(0);
  textSize(12);
  textAlign(CENTER, CENTER);
  text("Clear", 35, 20);

  // Add an "Eraser" button to the menu bar
  fill(255);
  rect(70, 5, 50, 30);
  fill(0);
  text("Eraser", 95, 20);

  // Add a "Pen" button to the menu bar
  fill(255);
  rect(130, 5, 50, 30);
  fill(0);
  text("Pen", 155, 20);

  // Add a color panel to the menu bar
  let colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
  let startX = 200;
  let circleSize = 20;
  for (let i = 0; i < colors.length; i++) {
    let colorX = startX + (i * circleSize * 1.5);
    fill(colors[i]);
    ellipse(colorX, 20, circleSize, circleSize);
  }

  // Add a size slider to the menu bar
  slider = createSlider(1, 50, slider);
  slider.position(400, 10);
}


function draw() {
  if (mouseIsPressed && mouseY > 40) { // Check if mouse is inside canvas
    if (eraserMode) {
      stroke(255); // Use white for eraser
    } else {
      stroke(c); // Use selected color for pen
    }
    line(mouseX, mouseY, pmouseX, pmouseY);
    // Set the stroke weight of the pen and eraser
    strokeWeight(slider.value());
  }
}

function mousePressed() {
  // Check if "Save" button is clicked
  if (mouseX > width-60 && mouseX < width-10 && mouseY > 5 && mouseY < 35) {
    // Save canvas as an image
    saveCanvas('myDrawing', 'png');
  }

  // Check if "Clear" button is clicked
  if (mouseX > 10 && mouseX < 60 && mouseY > 5 && mouseY < 35) {
    // Clear the user's drawing
    clearDrawing();
  }

  // Check if size slider is clicked
  if (mouseX > slider.position().x && mouseX < slider.position().x + slider.width &&
      mouseY > slider.position().y && mouseY < slider.position().y + slider.height) {
    // Update the slider value
    slider.value(map(mouseX, slider.position().x, slider.position().x + slider.width, 1, 50));
    // Update the size of the pen and eraser
    if (eraserMode) {
      strokeWeight(slider.value());
    } else {
      strokeWeight(slider.value());
    }
  }

  // Check if "Eraser" button is clicked
  if (mouseX > 70 && mouseX < 120 && mouseY > 5 && mouseY < 35) {
    eraserMode = true;
  }

  // Check if "Pen" button is clicked
  if (mouseX > 130 && mouseX < 180 && mouseY > 5 && mouseY < 35) {
    eraserMode = false;
  }

  // Check if color panel is clicked
  if (mouseY < 40) {
    let colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
    let startX = 200;
    let circleSize = 20;
    for (let i = 0; i < colors.length; i++) {
      let colorX = startX + (i * circleSize * 1.5);
      if (mouseX > colorX - circleSize / 2 && mouseX < colorX + circleSize / 2) {
        c = colors[i];
        eraserMode = false; // Set eraser mode to false when a color is selected
        stroke(c); // Set stroke color to selected color for pen
      }
    }
  }

  // Draw with pen or eraser depending on mode
  if (eraserMode) {
    stroke(255); // Use white for eraser
  } else {
    stroke(c); // Use selected color for pen
  }

  if (mouseIsPressed && mouseY > 40) { // Check if mouse is inside canvas
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function clearDrawing() {
  // Clear only the area below the menu bar
  fill(255);
  rect(0, 40, width, height-40);
}
