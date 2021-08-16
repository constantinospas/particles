const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
const particles = []
let hue = 0;
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('click', (ev) => {
    mouse.x = ev.x
    mouse.y = ev.y
    particles.push(new Particle())
})

canvas.addEventListener('mousemove', (ev) => {
    mouse.x = ev.x
    mouse.y = ev.y
    particles.push(new Particle())
})

class Particle {
    constructor() {
        this.id = Math.floor(Math.random() * 100)
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `hsl(${hue}, 100%, 50%)`
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) {
            this.size -= 0.05;
        } else {
            const index = particles.findIndex(particle => particle.id === this.id)
            particles.splice(index, 1)
            delete this
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // ctx.fillStyle = 'rgba(0,0,0,0.01)'
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    particles.forEach((particle, idx) => {
        particle.draw()
        particle.update()
        for (let i = idx; i < particles.length; i++) {
            const dx = particle.x - particles[i].x
            const dy = particle.y - particles[i].y
            const distance = Math.sqrt(dx ** 2 + dy ** 2)
            if (distance < 100) {
                ctx.beginPath()
                ctx.strokeStyle = particle.color
                ctx.lineWidth = 0.1
                ctx.moveTo(particle.x, particle.y)
                ctx.lineTo(particles[i].x, particles[i].y)
                ctx.stroke()
            }
        }
    })
    hue++;
    requestAnimationFrame(animate)
}

animate()