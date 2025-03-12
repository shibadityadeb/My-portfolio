const canvas = document.getElementById("animated-bg");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let circles = [];
const numCircles = 5;

for (let i = 0; i < numCircles; i++) {
    circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 200 + 100,
        dx: Math.random() * 1 - 0.5,
        dy: Math.random() * 1 - 0.5,
        color: `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 200)}, 0.3)`
    });
}

function drawBackground() {
    ctx.fillStyle = "#0A0F1F";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let circle of circles) {
        ctx.beginPath();
        let gradient = ctx.createRadialGradient(circle.x, circle.y, 0, circle.x, circle.y, circle.radius);
        gradient.addColorStop(0, circle.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        ctx.fillStyle = gradient;
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        circle.x += circle.dx;
        circle.y += circle.dy;

        if (circle.x - circle.radius < 0 || circle.x + circle.radius > canvas.width) {
            circle.dx *= -1;
        }
        if (circle.y - circle.radius < 0 || circle.y + circle.radius > canvas.height) {
            circle.dy *= -1;
        }
    }
    
    requestAnimationFrame(drawBackground);
}

drawBackground();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Right Side Animation
const rightCanvas = document.getElementById("right-animation");
const rightCtx = rightCanvas.getContext("2d");
rightCanvas.width = window.innerWidth;
rightCanvas.height = window.innerHeight;

let particles = [];
const numParticles = 30;

for (let i = 0; i < numParticles; i++) {
    particles.push({
        x: Math.random() * (rightCanvas.width / 2) + rightCanvas.width / 2,
        y: Math.random() * rightCanvas.height,
        radius: Math.random() * 5 + 2,
        speed: Math.random() * 2 + 1,
        angle: Math.random() * Math.PI * 2,
        color: "rgba(0, 255, 255, 0.7)"
    });
}

function animateParticles() {
    rightCtx.clearRect(0, 0, rightCanvas.width, rightCanvas.height);
    for (let particle of particles) {
        rightCtx.beginPath();
        rightCtx.fillStyle = particle.color;
        rightCtx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        rightCtx.fill();
        rightCtx.closePath();

        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;

        if (particle.x > rightCanvas.width || particle.x < rightCanvas.width / 2) {
            particle.angle = Math.random() * Math.PI * 2;
        }
        if (particle.y > rightCanvas.height || particle.y < 0) {
            particle.angle = Math.random() * Math.PI * 2;
        }
    }
    requestAnimationFrame(animateParticles);
}

animateParticles();
