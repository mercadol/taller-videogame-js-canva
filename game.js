const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);
let elementsSize;
let canvaSize;

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvaSize = window.innerWidth * 0.8;
  } else {
    canvaSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvaSize);
  canvas.setAttribute("height", canvaSize);

  elementsSize = canvaSize / 10;

  startGame();
}

function startGame() {
  game.font = elementsSize + "px Verdana";
  game.textAlign = "end";

  const map = maps[0];
  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));
  console.log({ map, mapRows, mapRowCols });

  mapRowCols.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const positionX = elementsSize * (colIndex + 1);
      const positiony = elementsSize * (rowIndex + 1);
      game.fillText(emojis[col], positionX, positiony);
    });
  });
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      game.fillText(
        emojis[mapRowCols[row][col]],
        elementsSize * (col + 1),
        elementsSize * (row + 1)
      );
    }
  }
}

window.addEventListener("keydown", moveByKeys);
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

function moveByKeys() {
  if (event.key == "ArrowUp") moveUp();
  else if (event.key == "ArrowLeft") moveLeft();
  else if (event.key == "ArrowRight") moveRight();
  else if (event.key == "ArrowDown") moveDown();
  else console.log(event.key);
}
function moveUp() {
  console.log("arriba");
}
function moveLeft() {
  console.log("izquierda");
}
function moveRight() {
  console.log("derecha");
}
function moveDown() {
  console.log("abajo");
}
