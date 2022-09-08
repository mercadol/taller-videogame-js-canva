const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");
const spanLives = document.querySelector("#lives");
const spanTime = document.querySelector("#time");

let elementsSize;
let canvaSize;
let level = 0;
let lives = 3;

let timePlayer;
let timeStart;
let timeInterval;

const playerPosition = {
  x: undefined,
  y: undefined,
};
const gifPosition = {
  x: undefined,
  y: undefined,
};
let enemyPositions = [];

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

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

  const map = maps[level];
  if (!map) {
    gameWin();
    return;
  }

  if(!timeStart){
  timeStart=Date.now();
  timeInterval = setInterval(showTime, 100);
  }
  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));

  showLives();
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
      } else if (col == "I") {
        gifPosition.x = positionX;
        gifPosition.y = positionY;
      } else if (col == "X") {
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
  const gifColition = gifColitionX && gifColitionY;
  if (gifColition) {
    levelWin();
  }

  const enemyColition = enemyPositions.find((enemy) => {
    const enemyColitionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyColitionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyColitionX && enemyColitionY;
  });
  if (enemyColition) {
    levelFail();
  }

  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

function levelWin() {
  console.log("subiste de nivel");
  level++;
  startGame();
}

function levelFail() {
  console.log("chocaste contra un enemigo");
  lives--;
  if (lives <= 0) {
    level = 0;
    lives = 3;
    timeStart = undefined;
  }
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}
function showLives() {
  spanLives.innerHTML = emojis["HEART"].repeat(lives);
}
function showTime (){
  spanTime.innerHTML= Date.now()-timeStart;
}
function gameWin() {
  console.log("terminaste el juego");
  clearInterval(timeInterval);
}
function gameOver() {
  console.log("Se acabaron las vidas");
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
