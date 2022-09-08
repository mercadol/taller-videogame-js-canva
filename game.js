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

const playerPosition = {
  x: undefined,
  y: undefined,
};
const gifPosition = {
  x: undefined,
  y: undefined,
};
let enemyPositions= [];

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

  enemyPositions = [];
  game.clearRect(0, 0, canvaSize, canvaSize);
  mapRowCols.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const positionX = elementsSize * (colIndex + 1);
      const positionY = elementsSize * (rowIndex + 1);

      if (col == "O") {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = positionX;
          playerPosition.y = positionY;
        }
      } else if (col == 'I'){
        gifPosition.x = positionX;
        gifPosition.y = positionY;
      } else if (col == 'X'){
        enemyPositions.push({
          x: positionX,
          y: positionY,
        });
      }
      game.fillText(emojis[col], positionX, positionY);
    });
  });
  movePlayer();
}

function movePlayer() {
  const gifColitionX = playerPosition.x.toFixed(3) == gifPosition.x.toFixed(3);
  const gifColitionY = playerPosition.y.toFixed(3) == gifPosition.y.toFixed(3);
  const gifColition = gifColitionX && gifColitionY
  if(gifColition) {console.log('subuste de nivel');}

  const enemyColition = enemyPositions.find(enemy =>{
    const enemyColitionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyColitionY =enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyColitionX && enemyColitionY
  });
  if(enemyColition) {console.log('chocaste contra un enemigo');}

  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
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
  if (playerPosition.y - elementsSize < elementsSize) {
    console.log("out");
  } else {
    playerPosition.y -= elementsSize;
    startGame();
  }
}
function moveLeft() {
  console.log("izquierda");
  if (playerPosition.x - elementsSize < elementsSize) {
    console.log("out");
  } else {
    playerPosition.x -= elementsSize;
    startGame();
  }
}
function moveRight() {
  console.log("derecha");
  if (playerPosition.x - elementsSize > canvaSize) {
    console.log("out");
  } else {
    playerPosition.x += elementsSize;
    startGame();
  }
}
function moveDown() {
  console.log("abajo");
  if (playerPosition.y - elementsSize > canvaSize) {
    console.log("out");
  } else {
    playerPosition.y += elementsSize;
    startGame();
  }
}
