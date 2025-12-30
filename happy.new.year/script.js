const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ================= COUNTDOWN 5 =================
// ================= COUNTDOWN 5 =================
let count = 5;
const countEl = document.getElementById("count");
const typingEl = document.getElementById("typing");

let fireworksActive = false;

const countdown = setInterval(() => {
    countEl.innerHTML = count;

    if (count === 0) {
        clearInterval(countdown);
        countEl.style.display = "none";
        startTyping("🎉 Happy New Year 2026 🎉");
        fireworksActive = true;
        return;
    }
    count--;
}, 1000);

// ================= TYPING EFFECT =================
function startTyping(text) {
    let index = 0;
    typingEl.classList.add("cursor");

    const typing = setInterval(() => {
        typingEl.innerHTML += text.charAt(index);
        index++;

        if (index === text.length) {
            clearInterval(typing);
            typingEl.classList.remove("cursor");
        }
    }, 120); // kecepatan ketik (ms)
}


// ================= FIREWORKS =================
let particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 3 + 1;
        this.color = `hsl(${Math.random() * 360},100%,50%)`;
        this.vx = Math.random() * 6 - 3;
        this.vy = Math.random() * 6 - 3;
        this.life = 100;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;

    for (let i = 0; i < 60; i++) {
        particles.push(new Particle(x, y));
    }
}

function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (fireworksActive && Math.random() < 0.05) {
        createFirework();
    }

    particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.life <= 0) particles.splice(i, 1);
    });

    requestAnimationFrame(animate);
}

animate();

// Responsive
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
