import Ball from "./Ball";
import Frame from "./Frame";

const canvas = document.createElement("canvas");
const wrapperEl = document.getElementById("wrapper");
const w = document.documentElement.clientWidth;

canvas.width = w < 400 ? w : 400;
canvas.height = canvas.width;

wrapperEl.appendChild(canvas);

const ctx = canvas.getContext("2d");

function resetCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fdfdfd";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return true;
}

const frame = new Frame();
function generateRandomHexColor() {
  const hexCharacters = "0123456789ABCDEF";
  let hexColor = "#";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * hexCharacters.length);
    hexColor += hexCharacters[randomIndex];
  }

  return hexColor;
}
for (let i = 0; i < 2; i++) {
  const ball = new Ball({
    wrapperWidth: canvas.width,
    wrapperHeight: canvas.height,
    isCircle: !Math.round(Math.random()),
    color: generateRandomHexColor(),
  });

  frame.onBefore = () => resetCanvas();

  frame.pushFrame(() => ball.move().render(ctx));
}
