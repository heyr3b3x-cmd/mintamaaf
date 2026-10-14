const screens = document.querySelectorAll(".screen");

function showScreen(id) {
  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// MINI GAME
const gameArea = document.getElementById("gameArea");
const scoreText = document.getElementById("score");
const startBtn = document.getElementById("startGame");
const nextBtn = document.getElementById("gameNext");
const gameHint = document.getElementById("gameHint");

let score = 0;
let gameRunning = false;
let spawnTimer;

function startGame() {
  score = 0;
  gameRunning = true;

  scoreText.textContent = score;
  startBtn.classList.add("hidden");
  nextBtn.classList.add("hidden");
  gameHint.classList.add("hidden");

  gameArea.querySelectorAll(".game-heart").forEach(heart => {
    heart.remove();
  });

  clearInterval(spawnTimer);
  spawnHeart();

  spawnTimer = setInterval(() => {
    if (gameRunning) spawnHeart();
  }, 800);
}

function spawnHeart() {
  if (!gameRunning) return;

  const heart = document.createElement("button");
  heart.className = "game-heart";
  heart.textContent = ["❤️", "💗", "💕"][
    Math.floor(Math.random() * 3)
  ];

  const maxX = gameArea.clientWidth - 45;
  const maxY = gameArea.clientHeight - 50;

  heart.style.left = Math.random() * Math.max(0, maxX) + "px";
  heart.style.top = Math.random() * Math.max(0, maxY) + "px";

  heart.addEventListener("click", () => {
    if (!gameRunning) return;

    score++;
    scoreText.textContent = score;
    heart.remove();

    if (score >= 5) {
      gameRunning = false;
      clearInterval(spawnTimer);

      gameArea.querySelectorAll(".game-heart").forEach(item => {
        item.remove();
      });

      gameHint.textContent = "Yeay, kamu berhasil! 💗";
      gameHint.classList.remove("hidden");

      startBtn.classList.add("hidden");
      nextBtn.classList.remove("hidden");
    }
  });

  gameArea.appendChild(heart);

  // Hati menghilang kalau tidak diklik
  setTimeout(() => {
    heart.remove();
  }, 2500);
}

// PASSWORD RAHASIA
const passwordForm = document.getElementById("passwordForm");
const passInput = document.getElementById("passInput");
const passMessage = document.getElementById("passMessage");

passwordForm.addEventListener("submit", function(event) {
  event.preventDefault();

  if (passInput.value === "178101") {
    passMessage.textContent = "Password benar! 💗";
    passMessage.style.color = "#c94d7b";

    setTimeout(() => {
      passInput.value = "";
      passMessage.textContent = "";
      showScreen("album");
    }, 700);
  } else {
    passMessage.textContent = "Yah, masih salah. Coba lagi yaa 💕";
    passMessage.style.color = "#d44c70";
    passInput.value = "";
  }
});

// HATI BERGERAK DI BACKGROUND
const heartContainer = document.getElementById("floating-hearts");

function createFloatingHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";

  heart.textContent = ["♡", "♥", "💕"][
    Math.floor(Math.random() * 3)
  ];

  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = (14 + Math.random() * 15) + "px";
  heart.style.animationDuration = (5 + Math.random() * 5) + "s";
  heart.style.color = ["#e76a98", "#f2a5c1", "#d85c91"][
    Math.floor(Math.random() * 3)
  ];

  heartContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 10000);
}

setInterval(createFloatingHeart, 700);