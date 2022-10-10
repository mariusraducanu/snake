class tail {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
const gameBoard = document.getElementById("cnv");
const ctx = gameBoard.getContext("2d");
const randomColor = Math.floor(Math.random()*16777215);
const gameUnit = 25;
let level = 1;
let gameSpeed = 300;
const directions = [25, 0];
let score = 0;
let snakeTail = [];
let length = 0;
let snakeX = 250;
let snakeY = 250;
let foodX = Math.floor(Math.random() * 20);
let foodY = Math.floor(Math.random() * 20);
function startGame() {
    document.getElementById("startGame").style.display = 'none';
    document.getElementById("image").style.display = 'none';
    document.getElementById("game-board").style.display = 'block';
    interval = setInterval(moveSnake, gameSpeed);
}

function moveSnake() {
    clearInterval(interval);
    interval = setInterval(moveSnake, gameSpeed);
    document.getElementById("level").style.display = "block";
    document.getElementById("level").innerHTML = "Level " + level;
    document.getElementById("score").innerHTML = score;
    changeDirection();
    if(gameOver()) {
        document.getElementById("cnv").style.display = "none";
        let img = document.createElement("img");
        img.src = "https://t4.ftcdn.net/jpg/02/11/54/33/360_F_211543376_kv7x0SwdITkWbqajGzglhcvZV25AsPsS.jpg";
        let div = document.getElementById("gameOver");
        div.appendChild(img);
        let btn = document.createElement("button");
        btn.innerHTML = "Reload";
        btn.style.textAlign = "center";
        btn.style.backgroundColor = "lime";
        btn.onclick = function () {
        location.reload();
        };
        document.body.appendChild(btn);
        document.getElementById("level").style.display = "none";
        return;
    };
    drawTable();
    drawSnake();
    if (eatFood() && score % 5 == 0 && score > 0) {
        speed();
        ++level;
    };
}

function drawTable() {
    for(let i = 0; i < 500; i += gameUnit) {
        for (let j = 0; j < 500; j += gameUnit) {
            ctx.moveTo(i, j);
            ctx.fillStyle = "lime";
            ctx.fillRect(i, j, gameUnit, gameUnit);
            ctx.strokeStyle = "black";
        } 
    }
    ctx.fillStyle = "green";
    ctx.fillRect(foodX * gameUnit, foodY * gameUnit, gameUnit, gameUnit);
}

function drawSnake() {
    ctx.fillStyle = "red";
    ctx.fillRect(snakeX, snakeY, gameUnit, gameUnit);
    for(let i = 0; i < snakeTail.length; ++i) {
        ctx.fillStyle = "blue";
        ctx.fillRect(snakeTail[i].x, snakeTail[i].y, gameUnit, gameUnit);
    }
    snakeTail.push(new tail(snakeX, snakeY));
    if(snakeTail.length > length) {
        snakeTail.shift();
    }
}

function speed() {
    gameSpeed -= 20;
}

function eatFood() {
    if(snakeX == foodX * gameUnit && snakeY == foodY * gameUnit) {
        foodX = Math.floor(Math.random() * 20);
        foodY = Math.floor(Math.random() * 20);
        ++length;
        ++score;
        return true;
    }
    return false;
}

function changeDirection() {
    snakeX += directions[0];
    snakeY += directions[1]; 
}

document.addEventListener('keydown', function(event) {
    if((event.keyCode == 65) || (event.keyCode == 37) && directions[0] != gameUnit) { // left
        directions[0] = -gameUnit;
        directions[1] = 0;
    } else if((event.keyCode == 68) || (event.keyCode == 39) && directions[0] != -gameUnit) { // right
        directions[0] = gameUnit;
        directions[1] = 0;
    } else if((event.keyCode == 87) || (event.keyCode == 38) && directions[1] != gameUnit) {// up
        directions[0] = 0;
        directions[1] = -gameUnit;
    } else if((event.keyCode == 83) || (event.keyCode == 40)  && directions[1] != -gameUnit) {// down
        directions[0] = 0;
        directions[1] = +gameUnit;
    }
})

function gameOver() {
    if(snakeX < 0 || snakeY < 0 || snakeX >= 499 || snakeY >= 499) {
        clearInterval(interval);
        return true;
    }
    for(let i = 0; i < snakeTail.length; ++i) {
        if(snakeX == snakeTail[i].x && snakeY == snakeTail[i].y) {
        clearInterval(interval);
        return true;
        }
    }
    return false;
}