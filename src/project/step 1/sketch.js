let mic;
let particles = [];
const particleCount = 500;
const center = { x: 0, y: 0 };
let rotationSpeed;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();

  rotationSpeed = createSlider(0.01, 1, 0.2, 0.01);
  rotationSpeed.position(10, 10);

  center.x = width / 2;
  center.y = height / 2;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      angle: random(TWO_PI),
      radius: random(width / 2),
      speed: random(0.01, 0.05),
    });
  }
}

function draw() {
  background(0, 50, 0, 0.1);

  let vol = mic.getLevel();
  let ripple = map(vol, 0, 0.5, 0.01, 0.5, true) * rotationSpeed.value();
  let hue = map(vol, 0, 0.5, 0, 360, true);

  colorMode(HSL);
  noStroke();

  particles.forEach((p) => {
    p.angle += ripple;
    let x = center.x + cos(p.angle) * p.radius;
    let y = center.y + sin(p.angle) * p.radius;

    fill(hue, 100, 50);
    ellipse(x, y, 4, 4);
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  center.x = width / 2;
  center.y = height / 2;
}
