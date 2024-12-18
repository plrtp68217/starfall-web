export const getRandomIndex = (array) => {
    return Math.floor(Math.random() * array.length);
}

export const getRandomRange = (min, max) => {
    return Math.random() * (max - min) + min;
}