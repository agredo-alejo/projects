function resetGame() {
    counter = 0;
    pipes = [];
}
function nextGeneration() {
    resetGame();
    activeBirds = generate(allBirds);
    allBirds = activeBirds.slice();
}
function generate(oldBirds) {
    let bird = poolSelection(oldBirds)
    let newBirds = []
    for (let i = 0; i < totalPopulation; i++) {
        newBirds[i] = bird.clone()
    }
    return newBirds
}
function poolSelection(birds) {
    let internHighScore = 0
    let internBestBird
    for (let i = 0; i < birds.length; i++) {
        let score = birds[i].score;
        if (score > internHighScore) {
            internHighScore = score;
            internBestBird = birds[i];
        }
    }
    return internBestBird
}