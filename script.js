  const gameBoard = document.getElementById("game-board");
  const scoreDisplay = document.getElementById("score");
  const startButton = document.getElementById("start-button");
  const gridSize = 20;
  let snake = [{ x: 10, y: 10 }];
  let direction = "right";
  let score = 0;
  let gameInterval;

  function createFood() {
    const food = { 
      x: Math.floor(Math.random() * gridSize), 
      y: Math.floor(Math.random() * gridSize) 
    };
    return food;
  }

  let food = createFood();

  function updateGame() {
    switch (direction) {
      case "up":
        snake.unshift({ x: snake[0].x, y: snake[0].y - 1 });
        break;
      case "down":
        snake.unshift({ x: snake[0].x, y: snake[0].y + 1 });
        break;
      case "left":
        snake.unshift({ x: snake[0].x - 1, y: snake[0].y });
        break;
      case "right":
        snake.unshift({ x: snake[0].x + 1, y: snake[0].y });
        break;
    }

    if (snake[0].x === food.x && snake[0].y === food.y) {
      food = createFood();
      score += 10;
      scoreDisplay.textContent = `Score: ${score}`;
    } else {
      snake.pop();
    }

    if (isGameOver()) {
      clearInterval(gameInterval);
      alert("Game Over! Your score: " + score);
      startButton.style.display = "block";
    }

    drawGame();
  }

  function isGameOver() {
    const head = snake[0];
    if (
      head.x < 0 || head.x >= gridSize ||
      head.y < 0 || head.y >= gridSize ||
      snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
    ) {
      return true;
    }
    return false;
  }

  function drawGame() {
    gameBoard.innerHTML = "";

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        if (x === food.x && y === food.y) {
          cell.classList.add("food");
        }

        snake.forEach(segment => {
          if (segment.x === x && segment.y === y) {
            cell.classList.add("snake");
          }
        });

        gameBoard.appendChild(cell);
      }
    }
  }

  function handleKeyPress(event) {
    switch (event.key) {
      case "ArrowUp":
        if (direction !== "down") direction = "up";
        break;
      case "ArrowDown":
        if (direction !== "up") direction = "down";
        break;
      case "ArrowLeft":
        if (direction !== "right") direction = "left";
        break;
      case "ArrowRight":
        if (direction !== "left") direction = "right";
        break;
    }
  }

  startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    snake = [{ x: 10, y: 10 }];
    direction = "right";
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    food = createFood();
    gameInterval = setInterval(updateGame, 150);
  });

  document.addEventListener("keydown", handleKeyPress);