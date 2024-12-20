import { getRandomIndex } from "./randoms.js";

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

const directions = ['top',  'bottom', 'left', 'right'];

let startTime = null;
const colors = ['orange', 'yellow', 'white'];

export const buildSquare = (current_cquare, x, y) => {
    let built_square = [];
    let squareX = x - 10;
    let squareY = y;
    const iterations = current_cquare / 10;

    for (let row = 1; row < iterations + 1; row++) {
        for (let column = 1; column < iterations + 1; column++) {
            squareX += 10;
            built_square.push({x: squareX, y: squareY});
        }
        squareX = x - 10;
        squareY += 10;
    }
    return built_square;
}

export const animationSquare = (built_square, current_time, duration) => {

    if (!startTime) {
        startTime = current_time;
    }

    const elapsedTime = current_time - startTime;

    if (elapsedTime < duration) {
        for (let section in built_square) {
            const directionIndex = getRandomIndex(directions)
            let current_direction = directions[directionIndex]
            switch (current_direction) {
                case 'top':
                    built_square[section].y -= 10;
                    break;
                case 'bottom':
                    built_square[section].y += 10;
                    break;
                case 'left':
                    built_square[section].x -= 10;
                    break;
                case 'right':
                    built_square[section].x += 10;
                    break;
            }
            const color_index = getRandomIndex(colors);
            const color = colors[color_index];
            ctx.fillStyle = color;
            ctx.fillRect(built_square[section].x, built_square[section].y, 10, 10)
        }
        requestAnimationFrame((time) => animationSquare(built_square, time, 200))
    }
    else {
        startTime = null;
    }
    
}