let video;
let snaps = []; // 캡쳐한 사진
let current = 0; // 카운팅
let canvas;
let canvasX, canvasY;
let saveBtn, resetBtn;

// —— 설정값 ——
const borderSize = 10; // 프레임 두께
const cutCount = 5; // 컷 프레임 (마지막만 텍스트)
const innerW = 200; // 카메라 너비
const frameH = 600 / 4; // 카메라 높이

function setup() {
  const innerH = frameH * cutCount;
  canvas = createCanvas(innerW + borderSize * 2, innerH + borderSize * 2);
  canvas.id('p5canvas');
  centerCanvas();

  // 카메라 셋업
  video = createCapture(VIDEO);
  video.size(innerW, frameH);
  video.hide();

  // 버튼 초기화 (숨김)
  saveBtn = createButton('저장');
  resetBtn = createButton('다시 찍기');
  saveBtn.hide();
  resetBtn.hide();

  // 저장 동작: 캔버스 이미지를 PNG로 저장
  saveBtn.mousePressed(() => {
    saveCanvas(canvas, 'dohyun_photo_booth', 'png');
  });
  // 리셋 동작: 사진 배열 초기화, 인덱스 리셋
  resetBtn.mousePressed(() => {
    snaps = [];
    current = -1;
  });
}

function draw() {
  background(0);

  push();
  translate(borderSize, borderSize);

  for (let i = 0; i < cutCount; i++) {
    let y = i * frameH;

    if (i < cutCount - 1) {
      // 사진/비디오 슬롯
      noStroke();
      fill(200);
      rect(0, y, innerW, frameH);

      if (i < current) {
        image(snaps[i], 0, y, innerW, frameH);
      } else if (i === current) {
        push();
        translate(innerW, y);
        scale(-1, 1);
        image(video, 0, 0, innerW, frameH);
        pop();
      }
    }

    // 슬롯 구분선
    noFill();
    stroke(255);
    rect(0, y, innerW, frameH - 150);

    //
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

  // 버튼 보이기/숨기기
  if (current === cutCount - 1) {
    // 캔버스 바로 아래에 버튼 배치
    saveBtn.position(canvasX + width + 100, height / 2);
    resetBtn.position(canvasX + saveBtn.width + 200, height / 2);
    saveBtn.show();
    resetBtn.show();
  } else {
    saveBtn.hide();
    resetBtn.hide();
  }
}

function mousePressed() {
  // 0~3번째 슬롯까지만 캡쳐
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

// 중앙정렬 (그리고 canvasX, canvasY 저장)
function centerCanvas() {
  canvasX = (windowWidth - width) / 2;
  canvasY = (windowHeight - height) / 2;
  canvas.position(canvasX, canvasY);
}

function windowResized() {
  centerCanvas();
}
