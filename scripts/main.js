import { buildSquare, animationSquare } from "./square_animation.js";
import { removeChilds } from "./utils.js";
import { createNewGameButton,
         createPauseButton,
         createContinueButton,
         createGameOverButton 
        } from "./button_creators.js";
import { getRandomRange } from "./randoms.js";

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

// ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ

let stars = [];
const star_parameter = 50;

const score_label = document.querySelector('.score');
let score = 0;

const lifes = document.querySelector('.lifes');
let lifes_count = 4

const gameBar = document.querySelector('.gamebar');

const newGameButton = createNewGameButton()

gameBar.appendChild(newGameButton);

const star_img = new Image();
star_img.src = 'assets/images/star.png'; 

const gameOverModal = document.querySelector('.game_over_container'); // модальное окно конца игры
const gameOverScore = document.querySelector('.game_over_score'); // блок набранных очков по концу игры
const gameOverButtonContainer = document.querySelector('.game_over_button'); // блок в котором нах-ся кнопка выхода из модалки
const gameOverButton = createGameOverButton(); // кнопка выхода из модалки
gameOverButton.addEventListener('click', closeGameOverModal); // добавляем событие выхода из модалки

function closeGameOverModal() {
    gameOverModal.style.display = 'none'
}

gameOverButtonContainer.appendChild(gameOverButton);

//

const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

canvas.addEventListener('click', (event) => {
    if (gameProcess) {
        const x = event.clientX;
        const y = event.clientY;
        starsAfterClick(x, y);
    }
})

canvas.addEventListener('touchstart', (event) => {
    if (gameProcess) {
    const touch = event.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    starsAfterClick(x, y);
    }
})

const addLifes = (count) => {
    for (let i = 0; i < count; i++) {
        const life = document.createElement('div');
        life.classList.add('life');
        lifes.appendChild(life);
    }
}

const removeLifes = (count) => {
    for (let i = 0; i < count; i++) {
        const life = document.querySelector('.life')
        if (life) {
            lifes.removeChild(life);
            lifes_count -= 1;
        }
    }
}

const starsAfterClick = (x, y) => {
    let filtered_stars = stars.filter(filter_star => x <= filter_star.x + star_parameter &
                                                     x >= filter_star.x &
                                                     y <= filter_star.y + star_parameter &
                                                     y >= filter_star.y);
    if (filtered_stars) {
        filtered_stars.map(filtered_star => {
            score += 10;
            score_label.innerText = `Счет: ${score}`;
            const built_square = buildSquare(30, filtered_star.x, filtered_star.y);
            stars = stars.filter(star => star.x !== filtered_star.x && star.y !== filtered_star.y);
            requestAnimationFrame((time) => animationSquare(built_square, time, 200));
        })
    }
}

const deleteStar = (star) => {
    let new_stars = stars.filter(filter_star => filter_star.x !== star.x && filter_star.y !== star.y);
    return new_stars;
}

const addStars = () => {
    stars.push({
        x: Math.floor(Math.random() * (canvas.width - star_parameter)),
        y: - star_parameter,
        speed: getRandomRange(0.2, 0.4),
    });
}

let lastTime = 0;

const moveStars = (second_stars, time) => {
    ctx.clearRect(0, 0 , canvas.width, canvas.height);
    ctx.fillStyle = 'white';

    const deltaTime = (time - lastTime);
    lastTime = time;

    if (second_stars) {
        for (let star of second_stars) {
            star.y += star.speed * deltaTime;
            
            if (star.y >= canvas.height + star_parameter) {
                stars = deleteStar(star);
                removeLifes(1);

                if (lifes_count === 0) {
                    console.log('GAME OVER');
                    gameOver()
                }
            }
            else {
                ctx.drawImage(star_img, star.x, star.y, star_parameter, star_parameter);
            } 
        }
    }
}

let gameProcess = false;

const motionRendering = (time) => {
    if (gameProcess) {
        moveStars([...stars], time);
        requestAnimationFrame(motionRendering);
    } 
}

let intervalId;

const startInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    intervalId = setInterval(addStars, 500);
  }

const stopInterval = () => {
    clearInterval(intervalId);
}

const newGame = () => {
    removeLifes(lifes_count);
    
    stars = [];
    score = 0;
    lifes_count = 4;
    gameProcess = true;
    score_label.innerText = `Счет: ${score}`;
    
    removeChilds('.gamebar', '#new');

    const pauseButton = createPauseButton();
    pauseButton.addEventListener('click', pauseGame);
    gameBar.appendChild(pauseButton);
    

    addLifes(lifes_count);
    motionRendering(); // отрисовка движения звезд
    startInterval(); // добавление звезд с интревалом 500 ms
}

newGameButton.addEventListener('click', newGame);

const pauseGame = () => {
    const pauseButton = document.querySelector('.pause');
    gameBar.removeChild(pauseButton);

    const newGameButton = createNewGameButton();
    newGameButton.addEventListener('click', newGame);

    gameBar.appendChild(newGameButton);

    const continueButton = createContinueButton();
    continueButton.addEventListener('click', continueGame);
    
    gameBar.appendChild(continueButton);

    gameProcess = false;
    stopInterval();

}

const continueGame = () => {
    const newGameButton = document.querySelector('.new');
    gameBar.removeChild(newGameButton);

    const continueButton = document.querySelector('.continue');
    gameBar.removeChild(continueButton);
    
    const pauseButton = createPauseButton();
    pauseButton.addEventListener('click', pauseGame);
    
    gameBar.appendChild(pauseButton);

    gameProcess = true;
    motionRendering();
    startInterval();

    
}

const gameOver = () => {
    gameProcess = false;
    stopInterval();

    removeChilds('.gamebar');

    const newGameButton = createNewGameButton();
    newGameButton.addEventListener('click', newGame);
    gameBar.appendChild(newGameButton);

    gameOverModal.style.display = 'flex';
    gameOverScore.innerText = `Набрано очков: ${score}`;

}