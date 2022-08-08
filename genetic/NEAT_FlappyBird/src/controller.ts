import { Bird } from "./bird";
import { totalPopulation } from "./main";


export function generate(oldBirds: Bird[]) {
    let bird = poolSelection(oldBirds)
    let newBirds = []
    for (let i = 0; i < totalPopulation; i++) {
        newBirds[i] = bird.clone()
    }
    return newBirds
}
export function poolSelection(birds: Bird[]) {
    let internHighScore = 0
    let internBestBird = birds[0]
    for (let i = 0; i < birds.length; i++) {
        let score = birds[i].score;
        if (score > internHighScore) {
            internHighScore = score;
            internBestBird = birds[i];
        }
    }
    return internBestBird
}