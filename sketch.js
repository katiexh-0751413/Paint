let c = "black";
let eraserMode = false;
let slider = 10; // initial size of pen and eraser
let colors = ["black", "gray", "white", "red", "orange", "yellow", "green", "blue", "indigo", "violet"];
menuHeight = 60;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  saveState();

  // Draw a black outline around the canvas
  noFill();
  stroke(200);
  strokeWeight(1);
  rect(0, 0, width, height);

  // Add a menu bar
  fill(200);
  rect(0, 0, width, menuHeight);

  // Add a "Save" button to the menu bar
  saveButton = createButton("Save");
  saveButton.position(width-55, 20);
  saveButton.class("button");
  saveButton.mousePressed(function() {
     // Create a new graphics object to hold the portion of the canvas we want to save
    let graphics = createGraphics(width, height-menuHeight);

    // Draw the portion of the canvas we want to save onto the graphics object
    graphics.image(get(0, menuHeight, width, height-menuHeight), 0, menuHeight);

    // Save the graphics object as a PNG file
    saveCanvas(graphics, 'myDrawing', 'png');
  });

  // Add a "Clear" button to the menu bar
  clearButton = createButton("Clear");
  clearButton.position(10, 5);
  clearButton.class("button");
  clearButton.mousePressed(function() {
    // Display a confirmation popup
    var confirmed = confirm("Are you sure you want to clear your drawing? This will erase all your previous work.");
    // If the user clicks "OK", clear the canvas
    if (confirmed) {
      // Clear only the area below the menu bar
      clearDrawing();
    }
  });

  // Add an "Eraser" button to the menu bar
  eraserButton = createButton("Eraser");
  eraserButton.position(85, 5);
  eraserButton.class("button");
  eraserButton.mousePressed(function() {
    eraserMode = true;
  });

  // Add a "Pen" button to the menu bar
  penButton = createButton("Pen");
  penButton.position(155, 5);
  penButton.class("button");
  penButton.mousePressed(function() {
      eraserMode = false;
    });

  // Add a color panel to the menu bar
  let startX = 220;
  let circleSize = 20;

  // Draw the color circles
  for (let i = 0; i < colors.length; i++) {
    let colorX = startX + (i * circleSize * 1.5);
    colorButton = createButton("");
    colorButton.position(colorX, 10);
    colorButton.style('background-color', colors[i]);
    colorButton.style('border-radius', '50%');
    colorButton.style('height', '20px');
    colorButton.style('width', '20px');
    colorButton.style('border', 'none');
    colorButton.class("button");
    colorButton.mousePressed(function() {
      eraserMode = false;
      colorButtonClicked(colors[i]);
    });
  }

  // Writing the colors text
  let pickerX = startX + (colors.length / 4 * circleSize * 1.5);
  stroke(0);
  strokeWeight(1);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(12);
  text("Colors", pickerX + 50, 45);

  // Add a size slider to the menu bar
  slider = createSlider(1, 50, slider);
  slider.position(60, 40);

  // Adding a color picker
  colorPicker = createColorPicker(c);
  colorPicker.position(550, 10);
  colorPicker.class("button");
  colorPicker.input(handleColorInput);
  textSize(10);
  text("Color Picker", 575, 50);
}

function colorButtonClicked(buttonColor) {
  c = buttonColor;
  stroke(buttonColor);
}

function handleColorInput() {
  c = this.value();
}

function draw() {
  colorPicker.value(c);
  if (mouseIsPressed && mouseY > menuHeight + slider.value() / 2) { // Check if mouse is inside canvas
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
    stroke(200);
    strokeWeight(1);
    rect(0, menuHeight, width, height);
}

function saveState() {
  // save state by taking image of background
  // for more info look at reference for get
  previousState = get();
}