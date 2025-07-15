// Récupération et Affichage de l'API horoscope
function afficherTousLesHoroscopes() {
  const container = document.getElementById("horoscope-result");
  const load = document.querySelector(".loader");
  
  // Afficher le loader
  load.classList.remove("hidden");

  // Vide l'ancien contenu
  container.innerHTML = "";

  // Récupère et Affiche l'API
  fetch("https://oracles-api.sidathsoeun.fr/oracle_api.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: "SI_DART_Sun_api_keys_!598254741369!excalibure!paramKeysOracle!887782secretNum&5882!",
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Erreur lors de la récupération.");
      return res.json();
    })
    .then((data) => {
      const horoscopes = data.horoscope;

      if (!horoscopes) {
        console.error("Aucun horoscope trouvé.");
        container.innerHTML = `<p style="color:red;">Aucun horoscope trouvé.</p>`;
        load.classList.add("hidden");
        return;
      }

      const signesEmoji = {
        Bélier: "♈︎",
        Taureau: "♉︎",
        Gémeaux: "♊︎",
        Cancer: "♋︎",
        Lion: "♌︎",
        Vierge: "♍︎",
        Balance: "♎︎",
        Scorpion: "♏︎",
        Sagittaire: "♐︎",
        Capricorne: "♑︎",
        Verseau: "♒︎",
        Poissons: "♓︎",
      };

      // Construis le contenu HTML
      let contenu =
        "<div style='text-align: center;'><h2 class='titre-horoscope'><span class='img'>🌌</span> Oracle du jour :</h2></div><div class='cards-container'>";
      for (const signe in horoscopes) {
        const emoji = signesEmoji[signe] || "";
        contenu += `
          <div class="card">
            <div class="card-header">${signe} <span class="emoji">${emoji}</span></div>
            <div class="card-body">${horoscopes[signe]}</div>
          </div>
        `;
      }
      contenu += "</div>";

      // Ajoute un délai avant d'afficher les cartes
      setTimeout(() => {
        load.classList.add("hidden")
        container.innerHTML = contenu;
      }, 3000);
    })
    .catch((error) => {
      container.innerHTML = `<p style="color:red;">Erreur : ${error.message}</p>`;
    });
}


// Fond animée Étoilés
const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  createStars();
});

const numStars = 300;
const stars = [];

function createStars() {
  stars.length = 0;
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      baseOpacity: Math.random() * 0.5 + 0.5,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.008,
    });
  }
}

// Étoile filante
let shootingStar = null;
let nextShootingStarTime = Date.now() + Math.random() * 8000 + 3000;

function createShootingStar() {
  shootingStar = {
    x: Math.random() * width,
    y: Math.random() * height * 0.5,
    vx: -6 - Math.random() * 4,
    vy: 6 + Math.random() * 4,
    length: 150,
    life: 0,
    maxLife: 60,
  };
}

function drawShootingStar() {
  if (!shootingStar) return;

  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.globalAlpha = 1 - shootingStar.life / shootingStar.maxLife;

  ctx.beginPath();
  ctx.moveTo(shootingStar.x, shootingStar.y);
  ctx.lineTo(
    shootingStar.x + shootingStar.length,
    shootingStar.y - shootingStar.length
  );
  ctx.stroke();

  shootingStar.x += shootingStar.vx;
  shootingStar.y += shootingStar.vy;
  shootingStar.life++;

  if (shootingStar.life > shootingStar.maxLife) {
    shootingStar = null;
    nextShootingStarTime = Date.now() + Math.random() * 8000 + 3000;
  }

  ctx.globalAlpha = 1;
}

function drawStars() {
  ctx.clearRect(0, 0, width, height);
  for (let star of stars) {
    const opacity = star.baseOpacity + 0.5 * Math.sin(star.phase);
    ctx.beginPath();
    ctx.globalAlpha = Math.max(0.2, Math.min(1, opacity));
    ctx.fillStyle = "white";
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function updateStars() {
  for (let star of stars) {
    star.phase += star.speed;
  }
}

function animate() {
  drawStars();
  updateStars();

  if (!shootingStar && Date.now() > nextShootingStarTime) {
    createShootingStar();
  }

  drawShootingStar();

  requestAnimationFrame(animate);
}

createStars();
animate();

// Étoiles animées fond bouton
const button = document.getElementById('space-btn');

function createBtnStars(count) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 200}px`;
    star.style.top = `${Math.random() * 45}px`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    star.style.transform = `scale(${Math.random() * 2})`;
    button.appendChild(star);
  }
}

createBtnStars(40);