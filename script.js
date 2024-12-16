let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
  
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let stars = []

let userX;
let userY;

const star_params = {
    width: 30,
    height: 30,
}

const addStars = () => {
    stars.push({
        x: Math.floor(Math.random() * canvas.width),
        y: - star_params.height,
    })
}


const moveStars = () => {
    ctx.clearRect(0, 0 , canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    for (let star of stars) {
        star.y += Math.floor(Math.random() * 3);
        ctx.fillRect(star.x, star.y, star_params.width, star_params.height)
    }
}

const game = () => {
    setInterval(moveStars, 10)
    setInterval(addStars, 500)
}

game()