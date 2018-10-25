const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// BRICKS VARIABLES
let brickRowCount = 3;
let brickColumnCount = 5;

let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let brickWidth = 60;

// COORDONNEES DE DEPART DE LA BALLE
let x = canvas.width / 2;
let y = canvas.height - 30;

// DEPLACEMENT DELTA
let dx = (Math.ceil(Math.random() * 4));
let dy = -(Math.floor(Math.random() * 4)) + .2;

// RAYON
let ballRadius = 5;
let color = "#FFFFFF";

// DIMENSIONS PADDLE
let paddleHeight = 5;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
console.log

// FLECHES NON PRESSEES INITIALEMENT
let rightPressed = false;
let leftPressed = false;

let score = 0;

// BRICKS ARRAY
var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {
            x: 0,
            y: 0,
            status: true
        };
    }
}

// EVENT LISTENER
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


// ARROW SWITCH
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

// BRICKS COLLISION DETECTION
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) { //IF BRICK IS APPARENT
                if (x > b.x - ballRadius && x < b.x - ballRadius + brickWidth && y > b.y - ballRadius && y < b.y - ballRadius + brickHeight) //IF BALL POSITION MATCHES BRICK POSITION 
                { //CHANGE DIRECTION ERASE BRICK ON 
                    dy = -dy;
                    b.status = false;
                    score++;

                }
            }
        }
    }
}


// SCORING
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, canvas.height / 2, canvas.width / 2);
}





// FORME BALLE
function drawBall() {

    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

// FORME PADDLE
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

// DRAW BRICKS
function drawBricks() {
    for (var r = 0; r < brickRowCount; r++) {
        for (var c = 0; c < brickColumnCount; c++) {
            if (bricks[c][r].status == true) {
                // BRICK ORIGIN POINT POSITION
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                // FOR EACH BRICK
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                // DRAWING THEM
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "red";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// JEU
function draw() {
    // RESET CANVAS EN FONCTION DU SETINTERVAL
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    collisionDetection();

    drawBall();
    drawPaddle();

    drawScore();


    //COLLISION DETECTION

    // SIDE COLLISION
    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
        dx = -dx;
    }


    // TOP COLLISION
    if (y + dy < ballRadius - 2) {
        dy = -dy;
    }

    // PADDLE COLLISION
    else if (y + dy > canvas.height - (ballRadius)) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;

            // NO PADDLE COLLISION = GAME OVER
        } else {
            //alert("GAME OVER");
            document.location.reload();
        }
    }

    //ARROW CONTROL
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }


    // DEPLACEMENT BALLE
    x += dx;
    y += dy;

}


setInterval(draw, 10);




// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();   
// ctx.closePath();

// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
// ctx.stroke();
// ctx.closePath();
