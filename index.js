const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

const speed = 7;

const tileCount = 20;

let tileSize = canvas.width / tileCount - 2;

let headX = 10, headY = 10;


let appleX = 5, appleY = 5;

let xVelocity = 0, yVelocity = 0;

let tailCount = 2;

let snakeParts = [];
let score = 0;

let bonus = 0;

let bonusX = 0, bonusY = 0;

const gulpSound = new Audio("gulp.mp3");

class SnakePart{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
}

//game loop
function drawGame () {
	clearScreen();

	drawSnake();
	updateSnakePosition();

	drawApple();
	checkAplleCollision();

	let result = isGameOver();
	if(result){
		return;
	}

	drawScore();
	drawBonus();
	checkBonusPosition();

	setTimeout(drawGame, 1000 / speed);
}

function clearScreen () {
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function drawSnake () {
	ctx.fillStyle = 'green';
	for (let i = 0; i < snakeParts.length; i++) {
		let part = snakeParts[i];
		ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
	}
	snakeParts.push(new SnakePart(headX, headY));

	if(snakeParts.length > tailCount){
		snakeParts.shift();
	}

	ctx.fillStyle = 'orange';
	ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function updateSnakePosition () {
	headX += xVelocity;
	headY += yVelocity;
}

function drawApple () {
	ctx.fillStyle = 'red';
	ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAplleCollision () {
	if(headX == appleX && headY == appleY){
		appleX = Math.floor(Math.random() * tileCount);
		appleY = Math.floor(Math.random() * tileCount);
		tailCount++;
		score++;
		gulpSound.play();
	}
}



function drawBonus () {
	if(score <= 0){
		return false;
	}
		if(score % 5 == 0){
		ctx.fillStyle = 'cyan';
		ctx.fillRect(bonusX * tileCount, bonusY * tileCount, tileSize, tileSize);
	}
	
}

function checkBonusPosition () {
	if(headX == bonusX &&  headY == bonusY){
		gulpSound.play();
		score += 2;
		bonusX = Math.floor(Math.random() * tileCount);
		bonusY = Math.floor(Math.random() * tileCount);
	} 
}

function isGameOver () {
	let gameOver = false;

	if(xVelocity == 0 && yVelocity == 0){
		return false;
	}

	if(headX < 0){
		gameOver = true;
	}

	if(headX >= tileCount){
		gameOver = true;
	}

	if(headY < 0){
		gameOver = true;
	}

	if(headY >= tileCount){
		gameOver = true;
	}

	for (var i = 0; i < snakeParts.length; i++) {
		let part = snakeParts[i];
		if(part.x === headX && part.y === headY){
			gameOver = true;
			break;
		}
	}



	if(gameOver){
		ctx.fillStyle = 'white';
		ctx.font ="50px Verdana";
		ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);

		ctx.font ="20px Verdana";
		ctx.fillText("Score: "+score, canvas.width / 2.5, canvas.height / 1.5);
	}

	return gameOver;
}

function drawScore () {
	ctx.fillStyle = 'white';
	ctx.font = "10px Verdana"
	ctx.fillText("Score: "+score, canvas.width - 50, 10);
}


window.addEventListener('keydown', keyDown);

function keyDown(event){
	console.log(event.key);
	//up
	if(event.key == 'ArrowUp'){
		if(yVelocity == 1){
			return;
		}
		yVelocity = -1;
		xVelocity = 0;
	}

	//down
	if(event.key == 'ArrowDown'){
		if(yVelocity == -1){
			return;
		}
		yVelocity = 1;
		xVelocity = 0;
	}

	//left

	if(event.key == 'ArrowLeft'){
		if(xVelocity == 1){
			return;
		}
		xVelocity = -1;
		yVelocity = 0;
	}
	//right
	if(event.key == 'ArrowRight'){
		if(xVelocity == -1){
			return;
		}
		xVelocity = 1;
		yVelocity = 0;
	}
	//reload game
	if(event.key == "r" || event.key == "R"){
		location.reload();
	}
}

drawGame();