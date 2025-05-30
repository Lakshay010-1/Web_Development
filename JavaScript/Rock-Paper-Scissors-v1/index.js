// 0 - rock
// 1 - paper
// 2 - scissors

var player1Move = Math.floor(Math.random() * 3);
var player2Move = Math.floor(Math.random() * 3);

document.querySelector(".p-1 .game-move").setAttribute("src", `images/p1-${player1Move}.png`);
document.querySelector(".p-2 .game-move").setAttribute("src", `images/p2-${player2Move}.png`);


var player1 = document.querySelector(".p-1");
var player1Text = document.querySelector(".p-1 h2");

var player2 = document.querySelector(".p-2");
var player2Text = document.querySelector(".p-2 h2");

var statusElement = document.querySelector(".game-status");

// Draw
if (player1Move == player2Move) {
    statusElement.textContent = "Draw";
    player1.classList.toggle("game-winner");
    player1Text.classList.toggle("game-winner-name");
    player2.classList.toggle("game-winner");
    player2Text.classList.toggle("game-winner-name");
} // Player 1 Win
else if ((player1Move == 0 && player2Move == 2) || (player1Move == 1 && player2Move == 0) || (player1Move == 2 && player2Move == 1)) {
    player1.classList.toggle("game-winner");
    player1Text.classList.toggle("game-winner-name");
    statusElement.textContent = "Player 1 Win";
} // Player 2 Win
else {
    statusElement.textContent = "Player 2 Win";
    player2.classList.toggle("game-winner");
    player2Text.classList.toggle("game-winner-name");
}
