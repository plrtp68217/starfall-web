let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

// const styles = ['red', 'orange', 'green', 'white', 'purple', 'yellow']
const styles = ['white'];
const directions = ['top',  'bottom', 'left', 'right'];

let startTime = null;

const getRandomIndex = (array) => {
    return Math.floor(Math.random() * array.length);
}


export const buildSquare = (current_cquare, x, y) => {
    let built_square = [];
    let squareX = x - 10;
    let squareY = y;
    const iterations = current_cquare / 10;

    for (let row = 1; row < iterations + 1; row++) {
        for (let column = 1; column < iterations + 1; column++) {
            squareX += 10;
            const styleIndex = getRandomIndex(styles)
            ctx.fillStyle = styles[styleIndex];
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
            ctx.fillRect(built_square[section].x, built_square[section].y, 10, 10)
        }
        requestAnimationFrame((time) => animationSquare(built_square, time, 200))
    }
    else {
        startTime = null;
    }
    
}