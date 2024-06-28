let font;
let etc = [];
let vehicles = [];
let word = "adapt";

function preload() {
  font = new loadFont("sfpro.otf");
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

  vehicles = [];
  for (i = 0; i < etc.length; i++) {
    let pt = etc[i];
    let r = new Vehicle(pt.x, pt.y);
    vehicles.push(r);
  }
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
  for (let i = 0; i < vehicles.length; i++) {
    let v = vehicles[i];
    v.behaviours();
    v.back();
    v.update();
    v.show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 100);
  textInChange();
}
