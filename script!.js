let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

let white_dot = {
    x: 0,
    y: 0,
}

let big_white_dot = {
    x: 100,
    y: 100,
}

document.onmousemove = (event) => {
    white_dot.x = event.offsetX;
    white_dot.y = event.offsetY;

    ctx.clearRect(0, 0 , canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.fillRect(white_dot.x, white_dot.y, 20, 20)
    ctx.fillRect(big_white_dot.x, big_white_dot.y, 100, 100);

    if (white_dot.x <= big_white_dot.x + 100 && white_dot.y <= big_white_dot.y + 100) {
        console.log('in');
    }
    else {
        console.log('out');
        
    }
  
}


const showDotsEffect = () => {
    for (let i = 0; i < 50; i++) {

    }
}



function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
// Вызываем функцию при загрузке страницы и при изменении размера окна
window.addEventListener('resize', resizeCanvas);
resizeCanvas();