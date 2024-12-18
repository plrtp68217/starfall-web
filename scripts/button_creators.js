export const createNewGameButton = () => {
    const newGameButton = document.createElement('button');
    newGameButton.classList.add('my_button', 'new');
    newGameButton.innerText = 'Новая игра';
    return newGameButton;
}

export const createPauseButton = () => {
    const pauseButton = document.createElement('button');
    pauseButton.classList.add('my_button', 'pause');
    pauseButton.innerText = 'Пауза';
    return pauseButton;
}

export const createContinueButton = () => {
    const continueButton = document.createElement('button');
    continueButton.classList.add('my_button', 'continue');
    continueButton.innerText = 'Продолжить';
    return continueButton;
}

export const createGameOverButton = () => {
    const gameOverButton = document.createElement('button');
    gameOverButton.classList.add('my_button_over');
    gameOverButton.innerText = 'Закрыть окно';
    return gameOverButton;
} 