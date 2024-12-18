let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

let destination = null; // точка падения звезды на фоне
let falling_star = {
    x: 0,
    y: 0,
}

const getRandomPosition = (width, height) => {
    let random_position = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
    }
    return random_position;
}
export const dropStar = (canW, canH) => {
    if (!destination) {
        destination = getRandomPosition(canW, canH);
        falling_star.x = Math.floor(Math.random() * canW);
    }

    // if (falling_star.x < destination.x) falling_star.x += 10;
    // if (falling_star.y < destination.y) falling_star.y += 10;

    falling_star.x = destination.x
    falling_star.y = destination.y
    ctx.fillRect(falling_star.x, falling_star.y, 3, 3)

    // if (falling_star.x < destination.x || falling_star.y < destination.y) {
    //     requestAnimationFrame(dropStar)
    // }
    // else {
        destination = null;
        falling_star.x = 0;
        falling_star.y = 0;
    // }
}