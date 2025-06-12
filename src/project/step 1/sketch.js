let video;
let snaps = []; // 캡쳐한 사진
let current = 0; // 카운팅
let canvas;

// —— 설정값 ——
const borderSize = 10; // 프레임 두께
const cutCount = 5; // 컷 프레임
const innerW = 200; // 카메라 너비
const frameH = 600 / 4; // 카메라 높이

function setup() {
  const innerH = frameH * cutCount;
  canvas = createCanvas(innerW + borderSize * 2, innerH + borderSize * 2);
  centerCanvas();

  video = createCapture(VIDEO);
  video.size(innerW, frameH);
  video.hide();
}

function draw() {
  background(0);

  push();
  translate(borderSize, borderSize);

  for (let i = 0; i < cutCount; i++) {
    let y = i * frameH;

    if (i < cutCount - 1) {
      noStroke();
      fill(200);
      rect(0, y, innerW, frameH);

      if (i < current) {
        // 캡쳐된 사진
        image(snaps[i], 0, y, innerW, frameH);
      } else if (i === current) {
        push();
        translate(innerW, y);
        scale(-1, 1);
        image(video, 0, 0, innerW, frameH);
        pop();
      }
    }

    // 구분선
    noFill();
    stroke(255);
    rect(0, y, innerW, frameH - 150);

    // 이름
    if (i === cutCount - 1) {
      textFont('pretendard');
      fill(255);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(32);
      text('도현네컷', innerW / 2, y + frameH / 2);
      textSize(9);
      text('In Dohyun Macbook', innerW / 2, y + frameH / 2 + 22);
    }
  }

  pop();
}

function mousePressed() {
  if (current < cutCount - 1) {
    snaps[current] = get(
      borderSize,
      borderSize + current * frameH,
      innerW,
      frameH
    );
    current++;
  }
}

// 중앙정렬
function centerCanvas() {
  const x = (windowWidth - width) / 2;
  const y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function windowResized() {
  centerCanvas();
}
