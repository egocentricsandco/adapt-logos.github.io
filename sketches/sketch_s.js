let font;
let etc = [];
let rotationRadius = 100;
let word = "adapt";

function preload() {
  font = loadFont("sfpro.otf");
}

function typeResized(size) {
  let aspectRatio = windowWidth / windowHeight;
  let reSize = aspectRatio * size;
  return reSize;
}

function textInChange() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  let txtSize = typeResized(370);
  etc = font.textToPoints(word, x + 55, y + windowHeight / 1.8, txtSize);
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight - 100);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
  textInChange();
}

function draw() {
  background(255);
  cursor(CROSS, mouseX, mouseY);
  for (let i = 0; i < etc.length; i++) {
    let pt = etc[i];
    let a = 0;
    a = a * 500;

    // Calculate the distance between the mouse and the current point
    let distToMouse = dist(mouseX, mouseY, pt.x, pt.y);

    if (distToMouse < rotationRadius) {
      // If the point is within the rotation radius, calculate the rotation angle
      let angle =
        atan2((pt.y * mouseY * height) / 2, (pt.x * mouseX * width) / 2) + a;
      let rotatedX = pt.x + cos(angle) * rotationRadius;
      let rotatedY = pt.y + sin(angle) * rotationRadius;

      // Calculate the angle of rotation for the square
      let squareAngle = atan2(
        rotatedY - pt.y * mouseY - 1,
        rotatedX - pt.x * mouseX - 1
      );

      push(); // Save the current drawing state
      translate(pt.x, pt.y); // Move the origin to the point
      rotate(squareAngle); // Rotate the square around its center
      let c = color(0);
      fill(c);
      noStroke();
      rectMode(CENTER);
      rect(0, 0, 35, 35);
      pop(); // Restore the previous drawing state
    } else {
      // If the point is outside the rotation radius, draw the square at its original position
      let c = color(0);
      fill(c);
      noStroke();
      rectMode(CENTER);
      rect(pt.x, pt.y, 15, 15);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 100);
  textInChange();
}
