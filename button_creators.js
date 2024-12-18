export const createNewGameButton = () => {
    const newGameButton = document.createElement('button');
    newGameButton.classList.add('my_button', 'new');
    newGameButton.innerText = 'NewGame';
    return newGameButton;
}

export const createPauseButton = () => {
    const pauseButton = document.createElement('button');
    pauseButton.classList.add('my_button', 'pause');
    pauseButton.innerText = 'Pause';
    return pauseButton
}

export const createContinueButton = () => {
    const continueButton = document.createElement('button');
    continueButton.classList.add('my_button', 'continue');
    continueButton.innerText = 'Continue';
    return continueButton;
}