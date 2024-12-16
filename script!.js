let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

let userX;
let userY;

const square = 30;

const styles = ['red', 'orange', 'green', 'white', 'purple', 'yellow']


const buildSquare = (current_cquare, x, y) => {
    let result_square = [];
    let squareX = x - 10;
    let squareY = y;
    const iterations = current_cquare / 10;

    for (let row = 1; row < iterations + 1; row++) {
        for (let column = 1; column < iterations + 1; column++) {
            squareX += 10;
            const styleIndex = Math.floor(Math.random() * styles.length)
            ctx.fillStyle = styles[styleIndex];
            ctx.fillRect(squareX, squareY, 10, 10)
        }
        squareX = x - 10;
        squareY += 10;
    }
}

document.onmousemove = (event) => {
    userX= event.offsetX;
    userY = event.offsetY;
}

document.addEventListener('click', (event) => {
    buildSquare(square, userX, userY)
})

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
// Вызываем функцию при загрузке страницы и при изменении размера окна
window.addEventListener('resize', resizeCanvas);
resizeCanvas();