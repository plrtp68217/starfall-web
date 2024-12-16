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

const filterStars = (star) => {
    new_stars = stars.filter(filter_star => filter_star.x !== star.x && filter_star.y !== star.y);
    return new_stars;
}

const addStars = () => {
    stars.push({
        x: Math.floor(Math.random() * canvas.width),
        y: - star_params.height,
    })
}


const moveStars = (second_stars) => {
    ctx.clearRect(0, 0 , canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    for (let star of second_stars) {
        star.y += Math.floor(Math.random() * 3);

        if (star.y >= canvas.height + star_params.height) {
            stars = filterStars(star);
        }
        else {
            ctx.fillRect(star.x, star.y, star_params.width, star_params.height);
        } 

    }
    console.log(stars.length);
}

const game = () => {
    setInterval(() => moveStars([...stars]), 10)
    setInterval(addStars, 500)
}

game()